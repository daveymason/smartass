import { useState, useEffect } from 'react';
import { 
  Grid, Typography, Box, 
  Card, CardHeader, CardContent 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SpaIcon from '@mui/icons-material/Spa';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import PsychologyIcon from '@mui/icons-material/Psychology';

// This should match the json structure I think
interface HealthData {
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

const InsightCard = styled(Card)(() => ({
    height: '100%',
    position: 'relative', 
  }));

  const CardIconWrapper = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'color',
  })<{ color?: string }>(({ theme, color }) => ({
    position: 'absolute',
    left: '-10px',
    top: '-10px',
    background: 'white',
    color: color || theme.palette.primary.main,
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.75rem',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.25)',
    border: `3px solid ${color || theme.palette.primary.main}`,
    zIndex: 2000,
    transition: 'all 0.3s ease',
    transform: 'translateZ(10px)',
  }));


const CustomCardHeader = styled(CardHeader, {
  shouldForwardProp: (prop) => prop !== 'bgColor',
})<{ bgColor?: string }>(({ bgColor }) => ({
  background: bgColor || 'linear-gradient(135deg, #3a8ffe, #0052cc)',
  paddingLeft: '50px',
  position: 'relative',
}));

const DataRow = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #f0f0f0',
    '&:last-child': {
      borderBottom: 'none',
    },
  }));

const DataLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
}));

const DataValue = styled(Typography)(() => ({
    fontWeight: 600,
  }));

const AiRecommendation = styled(Box)(({ theme }) => ({
  backgroundColor: '#f8fafc',
  borderLeft: `4px solid ${theme.palette.info.main}`,
  padding: theme.spacing(1),
  marginTop: theme.spacing(1),
  fontSize: '0.6rem',
  borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
}));

function HealthSummary() {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch health data');
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setHealthData(data);
      } catch (err: any) {
        setError('Error loading health data. Please try again later.');
        console.error('Error fetching health data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthData();
  }, []);

  if (loading) {
    return <Typography>Loading health data...</Typography>;
  }

  if (error || !healthData) {
    return <Typography color="error">{error || 'Failed to load health data'}</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Health Summary
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <InsightCard>
            <CustomCardHeader 
              title="Urine Analysis"
              id="urine-analysis-title"
            />
            <CardIconWrapper>
              <WaterDropIcon fontSize="large" />
            </CardIconWrapper>
            <CardContent>
              <DataRow>
                <DataLabel>pH Level:</DataLabel>
                <DataValue>{healthData.urineAnalysis.pHLevel}</DataValue>
              </DataRow>
              <DataRow>
                <DataLabel>Glucose:</DataLabel>
                <DataValue>{healthData.urineAnalysis.Glucose}</DataValue>
              </DataRow>
              <DataRow>
                <DataLabel>Protein:</DataLabel>
                <DataValue>{healthData.urineAnalysis.Protein}</DataValue>
              </DataRow>
              <DataRow>
                <DataLabel>Leukocytes:</DataLabel>
                <DataValue>{healthData.urineAnalysis.Leukocytes}</DataValue>
              </DataRow>
              <DataRow>
                <DataLabel>Nitrites:</DataLabel>
                <DataValue>{healthData.urineAnalysis.Nitrites}</DataValue>
              </DataRow>
              <DataRow>
                <DataLabel>Microalbumin:</DataLabel>
                <DataValue>{healthData.urineAnalysis.Microalbumin}</DataValue>
              </DataRow>
              <DataRow>
                <DataLabel>Creatinine:</DataLabel>
                <DataValue>{healthData.urineAnalysis.Creatinine}</DataValue>
              </DataRow>
            </CardContent>
          </InsightCard>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <InsightCard>
            <CustomCardHeader 
              title="Stool Analysis" 
              id="stool-analysis-title"
            />
            <CardIconWrapper color="#10b981">
              <SpaIcon fontSize="large" />
            </CardIconWrapper>
            <CardContent>
              <DataRow>
                <DataLabel>Consistency:</DataLabel>
                <DataValue>{healthData.stoolAnalysis.Consistency}</DataValue>
              </DataRow>
              <DataRow>
                <DataLabel>Blood:</DataLabel>
                <DataValue>{healthData.stoolAnalysis.Blood}</DataValue>
              </DataRow>
              <DataRow>
                <DataLabel>Calprotectin:</DataLabel>
                <DataValue>{healthData.stoolAnalysis.Calprotectin}</DataValue>
              </DataRow>
              <DataRow>
                <DataLabel>M2-PK:</DataLabel>
                <DataValue>{healthData.stoolAnalysis.M2PK}</DataValue>
              </DataRow>
              <DataRow>
                <DataLabel>Fat Content:</DataLabel>
                <DataValue>{healthData.stoolAnalysis.FatContent}</DataValue>
              </DataRow>
              <DataRow>
                <DataLabel>Elastase:</DataLabel>
                <DataValue>{healthData.stoolAnalysis.Elastase}</DataValue>
              </DataRow>
              <DataRow>
                <DataLabel>Parasites:</DataLabel>
                <DataValue>{healthData.stoolAnalysis.Parasites}</DataValue>
              </DataRow>
            </CardContent>
          </InsightCard>
        </Grid>

        {/* Physical Markers */}
        <Grid item xs={12} md={6} lg={3}>
          <InsightCard>
            <CustomCardHeader 
              title="Physical Markers"
              id="physical-markers-title" 
              bgColor="linear-gradient(135deg, #0dcaf0, #0a97b7)"
            />
            <CardIconWrapper color="#0dcaf0">
              <MonitorHeartIcon fontSize="large" />
            </CardIconWrapper>
            <CardContent>
              <DataRow>
                <DataLabel>Heart Rate:</DataLabel>
                <DataValue>{healthData.physicalMarkers.HeartRate}</DataValue>
              </DataRow>
              <DataRow>
                <DataLabel>Temperature:</DataLabel>
                <DataValue>{healthData.physicalMarkers.Temperature}</DataValue>
              </DataRow>
              <DataRow>
                <DataLabel>Weight:</DataLabel>
                <DataValue>{healthData.physicalMarkers.Weight}</DataValue>
              </DataRow>
              <DataRow>
                <DataLabel>Body Fat %:</DataLabel>
                <DataValue>{healthData.physicalMarkers.BodyFat}</DataValue>
              </DataRow>
              <DataRow>
                <DataLabel>Hydration:</DataLabel>
                <DataValue>{healthData.physicalMarkers.Hydration}</DataValue>
              </DataRow>
              <DataRow>
                <DataLabel>Sit-to-Stand:</DataLabel>
                <DataValue>{healthData.physicalMarkers.SitToStand}</DataValue>
              </DataRow>
              <DataRow>
                <DataLabel>Balance:</DataLabel>
                <DataValue>{healthData.physicalMarkers.Balance}</DataValue>
              </DataRow>
            </CardContent>
          </InsightCard>
        </Grid>

        {/* AI Insights */}
        <Grid item xs={12} md={6} lg={3}>
          <InsightCard>
            <CustomCardHeader 
              title="AI Insights" 
              id="ai-insights-title"
              bgColor="linear-gradient(135deg, #6366f1, #8b5cf6)"
            />
            <CardIconWrapper color="#8b5cf6">
              <PsychologyIcon fontSize="large" />
            </CardIconWrapper>
            <CardContent>
              <Typography variant="body1" paragraph>
                {healthData.aiInsights.summary}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 2 }}>
                Recommendations:
              </Typography>
              {healthData.aiInsights.recommendations.map((recommendation, index) => (
                <AiRecommendation key={index}>
                  <Typography variant="body2">{recommendation}</Typography>
                </AiRecommendation>
              ))}
            </CardContent>
          </InsightCard>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HealthSummary;