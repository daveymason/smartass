export interface HealthData {
    urineAnalysis: {
      pHLevel: number;
      Glucose: string;
      Protein: string;
      Leukocytes: string;
      Nitrites: string;
      Microalbumin: string;
      Creatinine: string;
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