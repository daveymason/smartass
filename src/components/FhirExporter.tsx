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

export function useFhirExporter(healthData: HealthData | null, patientId: string) {
  const getLOINCCode = (key: string): string => {
    const loincMap: Record<string, string> = {
      pHLevel: "2753-2",
      Glucose: "2345-7",
      Protein: "2888-6",
      Leukocytes: "5821-4",
      Nitrites: "32710-6",
      Microalbumin: "14957-5",
      Creatinine: "2160-0",
      Consistency: "33463-0",
      Blood: "5778-6", 
      Calprotectin: "53373-4",
      M2PK: "58453-2", 
      FatContent: "15238-9",
      Elastase: "13690-3",
      Parasites: "6399-9",
      HeartRate: "8867-4",
      Temperature: "8310-5",
      Weight: "29463-7",
      BodyFat: "41982-0",
      Hydration: "24359-4", 
      SitToStand: "89204-2",
      Balance: "62356-1"
    };
    
    return loincMap[key] || "74728-7"; // Default to "Undetermined" code
  };

  const convertToFHIR = useCallback((data: HealthData, id: string) => {
    const bundle: FhirBundle = {
      resourceType: "Bundle",
      type: "collection",
      entry: []
    };
    
    // patient resource
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
    
    // Urine data to Observation resources
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
    
    // stool conversion to Observation resources
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
    
    //Observation resources for physical markers
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
              data: btoa(data.aiInsights.summary || "")
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
                data: btoa(data.aiInsights.recommendations.join("\n"))
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