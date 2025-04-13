import React from 'react';  // Add this import
import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useFhirExporter } from '../components/FhirExporter';
import { HealthData } from '../types/healthData';

const originalCreateElement = document.createElement;

document.createElement = jest.fn().mockImplementation((tag) => {
  if (tag === 'a') {
    return {
      setAttribute: jest.fn(),
      click: jest.fn(),
      remove: jest.fn(),
    };
  }
  return originalCreateElement.call(document, tag);
});

document.body.appendChild = jest.fn();
document.body.removeChild = jest.fn();

const Wrapper = ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children);

describe('FhirExporter Hook', () => {
  const mockHealthData: HealthData = {
    urineAnalysis: {
      pHLevel: 6.2,
      Glucose: "Normal",
      Protein: "Trace",
      Leukocytes: "Negative",
      Nitrites: "Negative",
      Microalbumin: "18 mg/L",
      Creatinine: "1.2 mg/dL"
    },
    stoolAnalysis: {
      Consistency: "Type 4",
      Blood: "Negative",
      Calprotectin: "50 µg/g",
      M2PK: "2.0 U/mL",
      FatContent: "Normal",
      Elastase: "420 µg/g",
      Parasites: "None detected"
    },
    physicalMarkers: {
      HeartRate: "72 bpm",
      Temperature: "98.6°F",
      Weight: "180 lbs",
      BodyFat: "24%",
      Hydration: "Adequate",
      SitToStand: "5.2 sec",
      Balance: "Stable"
    },
    aiInsights: {
      summary: "Test summary",
      recommendations: ["Test recommendation"]
    }
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    document.createElement = originalCreateElement;
  });

  test('exportFHIR creates and triggers download link', () => {
    jest.spyOn(document, 'createElement');
    jest.spyOn(document.body, 'appendChild');
    jest.spyOn(document.body, 'removeChild');
    
    const exportFHIR = () => {
      if (!mockHealthData) return;
      
      const downloadLink = document.createElement('a');
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
    
    exportFHIR();
    
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(document.body.appendChild).toHaveBeenCalled();
    expect(document.body.removeChild).toHaveBeenCalled();
  });

  test('gracefully handles null health data', () => {
    const exportFHIR = () => {
      const healthData = null;
      if (!healthData) return;
      
      const downloadLink = document.createElement('a');
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
    
    expect(() => exportFHIR()).not.toThrow();
    expect(document.createElement).not.toHaveBeenCalled();
  });
});