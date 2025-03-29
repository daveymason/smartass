import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PsychologyIcon from '@mui/icons-material/Psychology';
import InsightsIcon from '@mui/icons-material/Insights';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ScienceIcon from '@mui/icons-material/Science';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { aiRecommendationStyles } from '../theme';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  overflow: 'hidden',
}));

const StyledCardHeader = styled(CardHeader)<{ bgcolor?: string }>(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor || theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(2),
  '& .MuiCardHeader-title': {
    fontWeight: 600,
    fontSize: '1.1rem',
  },
  '& .MuiCardHeader-avatar': {
    marginRight: theme.spacing(1.5),
  },
}));

const RecommendationItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'borderColor',
})<{ borderColor?: string }>(({ theme, borderColor }) => ({
  ...aiRecommendationStyles,
  borderLeftColor: borderColor || theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
}));

const GradientButton = styled(Button)(({ theme }) => ({
  backgroundImage: 'linear-gradient(135deg, #3a8ffe, #0052cc, #0Baacc, #825EF5)',
  color: theme.palette.common.white,
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[8],
    transform: 'translateY(-2px)',
  },
}));

const AiInsights: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  
  const generateInsights = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 2500);
  };
  
  const medicalRecommendations = [
    "Schedule a follow-up appointment in 3 months",
    "Consider additional screening for kidney function",
    "Monitor blood pressure twice weekly",
    "Discuss vitamin D supplementation with your physician",
    "Review medication regimen at next visit"
  ];
  
  const nutritionRecommendations = [
    "Increase daily fiber intake to 25-30g",
    "Reduce sodium consumption to under 2000mg per day",
    "Add omega-3 rich foods like fatty fish twice weekly",
    "Consider plant-based protein alternatives",
    "Stay hydrated with at least 2L of water daily"
  ];
  
  const fitnessRecommendations = [
    "Aim for 150 minutes of moderate aerobic activity weekly",
    "Incorporate strength training 2-3 times per week",
    "Add flexibility exercises like yoga or stretching",
    "Consider balance exercises to improve stability",
    "Start with short walks and gradually increase duration"
  ];
  
  if (!generated) {
    return (
      <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="600">
          AI Health Insights
        </Typography>
        
        <Typography variant="body1" paragraph>
          Our AI can analyze your health data to provide personalized recommendations
          across medical, dietary, and fitness domains.
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            AI insights are generated based on your health data and should be used as general guidance only.
            Always consult with healthcare professionals before making significant changes to your health regimen.
          </Typography>
        </Alert>
        
        <StyledCard>
          <StyledCardHeader
            avatar={<PsychologyIcon />}
            title="What to Expect"
            bgcolor="#3a8ffe"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary" paragraph>
              By clicking "Generate Insights", our AI will analyze:
            </Typography>
            <List dense>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <MedicalServicesIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary="Medical recommendations based on your test results" />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <LocalDiningIcon fontSize="small" sx={{ color: '#4caf50' }} />
                </ListItemIcon>
                <ListItemText primary="Dietary suggestions to improve health markers" />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <FitnessCenterIcon fontSize="small" sx={{ color: '#ff9800' }} />
                </ListItemIcon>
                <ListItemText primary="Exercise and lifestyle recommendations" />
              </ListItem>
            </List>
          </CardContent>
        </StyledCard>
        
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 4 }}>
            <CircularProgress />
            <Typography variant="body2" color="text.secondary">
              Analyzing your health data and generating personalized insights...
            </Typography>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <GradientButton 
              variant="contained" 
              disableElevation
              startIcon={<InsightsIcon />}
              onClick={generateInsights}
              size="large"
              sx={{ 
                backgroundSize: '300% 300%',
                animation: 'gradient 3s ease infinite',
                '@keyframes gradient': {
                  '0%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                  '100%': { backgroundPosition: '0% 50%' },
                }
              }}
            >
              Generate AI Insights
            </GradientButton>
          </Box>
        )}
      </Box>
    );
  }
  
  return (
    <Box sx={{ p: 3 }}>  
      <Typography variant="h4" component="h1" gutterBottom fontWeight="600">
        Your AI Health Insights
      </Typography>
      
      <Typography variant="body1" paragraph>
        Based on your health data, our AI has generated the following personalized recommendations.
        Review these insights with your healthcare provider.
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',                    
            md: 'repeat(3, 1fr)'          
          },
          gap: 3
        }}
      >
        <StyledCard sx={{ height: '100%' }}>  
          <StyledCardHeader
            avatar={<ScienceIcon />}
            title="Medical Recommendations"
            bgcolor="#3a8ffe"
          />
          <CardContent>
            <List sx={{ p: 0 }}>
              {medicalRecommendations.map((recommendation, index) => (
                <RecommendationItem key={index} borderColor="#3a8ffe">
                  <ListItem alignItems="flex-start" sx={{ p: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon fontSize="small" sx={{ color: '#3a8ffe' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={recommendation}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>
                </RecommendationItem>
              ))}
            </List>
          </CardContent>
        </StyledCard>
        
        <StyledCard sx={{ height: '100%' }}>
          <StyledCardHeader
            avatar={<BarChartIcon />}
            title="Nutrition Recommendations"
            bgcolor="#4caf50"
          />
          <CardContent>
            <List sx={{ p: 0 }}>
              {nutritionRecommendations.map((recommendation, index) => (
                <RecommendationItem key={index} borderColor="#4caf50">
                  <ListItem alignItems="flex-start" sx={{ p: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon fontSize="small" sx={{ color: '#4caf50' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={recommendation}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>
                </RecommendationItem>
              ))}
            </List>
          </CardContent>
        </StyledCard>
        
        <StyledCard sx={{ height: '100%' }}>
          <StyledCardHeader
            avatar={<AssessmentIcon />}
            title="Fitness Recommendations"
            bgcolor="#ff9800"
          />
          <CardContent>
            <List sx={{ p: 0 }}>
              {fitnessRecommendations.map((recommendation, index) => (
                <RecommendationItem key={index} borderColor="#ff9800">
                  <ListItem alignItems="flex-start" sx={{ p: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon fontSize="small" sx={{ color: '#ff9800' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={recommendation}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>
                </RecommendationItem>
              ))}
            </List>
          </CardContent>
        </StyledCard>
      </Box>
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <GradientButton 
          variant="contained" 
          disableElevation
          startIcon={<TrackChangesIcon />}
          onClick={() => setGenerated(false)}
          sx={{ 
            backgroundSize: '300% 300%',
            animation: 'gradient 3s ease infinite',
            '@keyframes gradient': {
              '0%': { backgroundPosition: '0% 50%' },
              '50%': { backgroundPosition: '100% 50%' },
              '100%': { backgroundPosition: '0% 50%' },
            }
          }}
        >
          Reset & Generate New Insights
        </GradientButton>
      </Box>
    </Box>
  );
};

export default AiInsights;