import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import HealthSummary from '../components/HealthSummary';

jest.mock('react-to-pdf', () => ({
  usePDF: () => ({
    toPDF: jest.fn(),
    targetRef: { current: null }
  })
}));

jest.mock('../components/FhirExporter', () => ({
  useFhirExporter: () => ({
    exportFHIR: jest.fn()
  })
}));

const mockHealthData = {
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
    recommendations: ["Drink more water"]
  }
};

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockHealthData)
    })
  ) as jest.Mock;
});

describe('HealthSummary Component', () => {
  test('shows loading state initially', () => {
    render(
      <ThemeProvider theme={theme}>
        <HealthSummary patientId="123" />
      </ThemeProvider>
    );
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
  
  test('displays health data after loading', async () => {
    render(
      <ThemeProvider theme={theme}>
        <HealthSummary patientId="123" />
      </ThemeProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Urine Analysis')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Stool Analysis')).toBeInTheDocument();
    expect(screen.getByText('Physical Markers')).toBeInTheDocument();
    expect(screen.getByText('AI Insights')).toBeInTheDocument();
    expect(screen.getByText('pH Level:')).toBeInTheDocument();
    expect(screen.getByText('6.2')).toBeInTheDocument();
  });
  
  test('shows error message when fetch fails', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() => {
      throw new Error('Network error');
    });
    
    render(
      <ThemeProvider theme={theme}>
        <HealthSummary patientId="123" />
      </ThemeProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText(/Error loading health data/i)).toBeInTheDocument();
    });
  });
});