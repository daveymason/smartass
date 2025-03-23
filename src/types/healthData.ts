export interface HealthData {
  urineAnalysis: {
    pHLevel: number;
    Glucose: string;
    Protein: string;
    Leukocytes: string;
    Nitrites: string;
    Microalbumin: string;
    Creatinine: string;
    detailedMetrics?: {
      primary: UrineMeasurement[];
      secondary: UrineMeasurement[];
      advanced: UrineMeasurement[];
    };
  };
  stoolAnalysis: {
    Consistency: string;
    Blood: string;
    Calprotectin: string;
    M2PK: string;
    FatContent: string;
    Elastase: string;
    Parasites: string;
  };
  physicalMarkers: {
    HeartRate: string;
    Temperature: string;
    Weight: string;
    BodyFat: string;
    Hydration: string;
    SitToStand: string;
    Balance: string;
  };
  aiInsights: {
    summary: string;
    recommendations: string[];
  };
}

export interface UrineMeasurement {
  metric: string;
  value: number | string;
  unit: string | null;
  notes: string;
  status: 'normal' | 'warning' | 'alert' | 'unknown';
}