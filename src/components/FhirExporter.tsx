import { useCallback } from 'react';
import { HealthData } from '../types/healthData';

interface FhirBundle {
    resourceType: string;
    type: string;
    entry: Array<{
      resource: FhirResource;
    }>;
  }
  
  interface FhirResource {
    resourceType: string;
    id?: string;
    status?: string;
    [key: string]: any;
  }

  // Helper function for Base64 encoding without using btoa directly
function encodeBase64(str: string) {
  const utf8Bytes = new TextEncoder().encode(str);
  
  let binaryStr = '';
  utf8Bytes.forEach(byte => {
    binaryStr += String.fromCharCode(byte);
  });
  
  return btoa(binaryStr); //I give up. 
}

export function useFhirExporter(healthData: HealthData | null, patientId: string) {
  const getLOINCCode = (key: string): string => {
    const loincMap: Record<string, string> = {
      pHLevel: "5803-2",         //https://loinc.org/5803-2
      Glucose: "5792-7",         //https://loinc.org/5792-7
      Protein: "20454-5",        //https://loinc.org/20454-5
      Leukocytes: "5799-2",      //https://loinc.org/5799-2
      Nitrites: "2657-5",        //https://loinc.org/2657-5
      Microalbumin: "14957-5",   //https://loinc.org/14957-5
      Creatinine: "12190-5",     //https://loinc.org/12190-5 
      Consistency: "11029-6",    //https://loinc.org/11029-6
      Blood: "2335-8",           //https://loinc.org/2335-8
      Calprotectin: "38445-3",   //https://loinc.org/38445-3
      M2PK: "100654-3",          //https://loinc.org/100654-3  
      FatContent: "2270-7",      //https://loinc.org/2270-7 
      Elastase: "25907-7",       //https://loinc.org/25907-7
      Parasites: "10701-1",      //https://loinc.org/10701-1
      HeartRate: "8867-4",       //https://loinc.org/8867-4
      Temperature: "8310-5",     //https://loinc.org/8310-5
      Weight: "29463-7",         //https://loinc.org/29463-7
      BodyFat: "41982-0",        //https://loinc.org/41982-0
      Hydration: "81676-9",      //https://loinc.org/81676-9
      SitToStand: "LP125096-0",  //https://loinc.org/LP125096-0
      Balance: "46654-0",        //https://loinc.org/62356-1
      Ketones: "2514-8",         //https://loinc.org/2514-8
    };
    
    return loincMap[key] || "Lonic Code Cannot Be Found"; 
  };

  const convertToFHIR = useCallback((data: HealthData, id: string) => {
    const bundle: FhirBundle = {
      resourceType: "Bundle",
      type: "collection",
      entry: []
    };
    
    bundle.entry.push({
      resource: {
        resourceType: "Patient",
        id: id,
        identifier: [{
          system: "urn:ietf:rfc:3986",
          value: `urn:uuid:${id}`
        }]
      }
    });
    
    if (data.urineAnalysis) {
      Object.entries(data.urineAnalysis).forEach(([key, value]) => {
        bundle.entry.push({
          resource: {
            resourceType: "Observation",
            status: "final",
            code: {
              coding: [{
                system: "http://loinc.org",
                code: getLOINCCode(key),
                display: key
              }]
            },
            subject: {
              reference: `Patient/${id}`
            },
            effectiveDateTime: new Date().toISOString(),
            valueString: value?.toString() || ""
          }
        });
      });
    }
    
    if (data.stoolAnalysis) {
      Object.entries(data.stoolAnalysis).forEach(([key, value]) => {
        bundle.entry.push({
          resource: {
            resourceType: "Observation",
            status: "final",
            code: {
              coding: [{
                system: "http://loinc.org",
                code: getLOINCCode(key),
                display: key
              }]
            },
            subject: {
              reference: `Patient/${id}`
            },
            effectiveDateTime: new Date().toISOString(),
            valueString: value?.toString() || ""
          }
        });
      });
    }
    
    if (data.physicalMarkers) {
      Object.entries(data.physicalMarkers).forEach(([key, value]) => {
        bundle.entry.push({
          resource: {
            resourceType: "Observation",
            status: "final",
            code: {
              coding: [{
                system: "http://loinc.org",
                code: getLOINCCode(key),
                display: key
              }]
            },
            subject: {
              reference: `Patient/${id}`
            },
            effectiveDateTime: new Date().toISOString(),
            valueString: value?.toString() || ""
          }
        });
      });
    }
    
    if (data.aiInsights) {
      bundle.entry.push({
        resource: {
          resourceType: "DocumentReference",
          status: "current",
          docStatus: "final",
          type: {
            coding: [{
              system: "http://loinc.org",
              code: "11488-4",
              display: "Consult note"
            }]
          },
          subject: {
            reference: `Patient/${id}`
          },
          date: new Date().toISOString(),
          content: [{
            attachment: {
              contentType: "text/plain",
              data: encodeBase64(data.aiInsights.summary || "")
            }
          }]
        }
      });

      // A DocumentReference for the AI insights for now
      if (data.aiInsights.recommendations && data.aiInsights.recommendations.length > 0) {
        bundle.entry.push({
          resource: {
            resourceType: "DocumentReference",
            status: "current",
            docStatus: "final",
            type: {
              coding: [{
                system: "http://loinc.org",
                code: "56447-6",
                display: "Plan of care note"
              }]
            },
            subject: {
              reference: `Patient/${id}`
            },
            date: new Date().toISOString(),
            content: [{
              attachment: {
                contentType: "text/plain",
                data: encodeBase64(data.aiInsights.recommendations.join("\n"))
              }
            }]
          }
        });
      }
    }
    
    return bundle;
  }, []);

  const exportFHIR = useCallback(() => {
    if (!healthData) return;
    
    try {
      const fhirData = convertToFHIR(healthData, patientId);
      
      const dataStr = JSON.stringify(fhirData, null, 2);
      const dataUri = 'data:application/fhir+json;charset=utf-8,' + encodeURIComponent(dataStr);
      const exportFileName = `fhir_data_${patientId}_${new Date().toISOString().split('T')[0]}.json`;
      
      const downloadLink = document.createElement('a');
      downloadLink.setAttribute('href', dataUri);
      downloadLink.setAttribute('download', exportFileName);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error("Error exporting FHIR data:", error);
      alert("Failed to export FHIR data. See console for details.");
    }
  }, [healthData, patientId, convertToFHIR]);

  return { exportFHIR };
}