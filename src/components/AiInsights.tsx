import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  FormGroup
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
import { useLanguage } from '../i18n/LanguageContext';
import StyledCard from './ui/StyledCard';
import RecommendationItem from './ui/RecommendationItem';

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
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const generateInsights = () => {
    if (!consentGiven) {
      setConsentError(true);
      return;
    }

    setConsentError(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 2500);
  };

  const handleConsentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConsentGiven(event.target.checked);
    if (event.target.checked) {
      setConsentError(false);
    }
  };

  // Use translated recommendations for demo
  const medicalRecommendations = t('aiInsights.recommendations.medical', { returnObjects: true }) || [
    "Schedule a follow-up appointment in 3 months",
    "Consider additional screening for kidney function",
    "Monitor blood pressure twice weekly",
    "Discuss vitamin D supplementation with your physician",
    "Review medication regimen at next visit"
  ];

  const nutritionRecommendations = t('aiInsights.recommendations.nutrition', { returnObjects: true }) || [
    "Increase daily fiber intake to 25-30g",
    "Reduce sodium consumption to under 2000mg per day",
    "Add omega-3 rich foods like fatty fish twice weekly",
    "Consider plant-based protein alternatives",
    "Stay hydrated with at least 2L of water daily"
  ];

  const fitnessRecommendations = t('aiInsights.recommendations.fitness', { returnObjects: true }) || [
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
          {t('aiInsights.title')}
        </Typography>

        <Typography variant="body1" paragraph>
          {t('aiInsights.description')}
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            {t('aiInsights.disclaimer')}
          </Typography>
        </Alert>

        <StyledCard
          title={t('aiInsights.whatToExpect')}
          icon={<PsychologyIcon />}
          headerColor="#3a8ffe"
        >
          <Typography variant="body2" color="text.secondary" paragraph>
            {t('aiInsights.byClicking')}
          </Typography>
          <List dense>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <MedicalServicesIcon fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText primary={t('aiInsights.medicalRecommendations')} />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <LocalDiningIcon fontSize="small" sx={{ color: '#4caf50' }} />
              </ListItemIcon>
              <ListItemText primary={t('aiInsights.dietarySuggestions')} />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <FitnessCenterIcon fontSize="small" sx={{ color: '#ff9800' }} />
              </ListItemIcon>
              <ListItemText primary={t('aiInsights.exerciseRecommendations')} />
            </ListItem>
          </List>
        </StyledCard>

        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 4 }}>
            <CircularProgress />
            <Typography variant="body2" color="text.secondary">
              {t('aiInsights.analyzing')}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Box
              sx={{
                mb: 2,
                p: 2,
                border: consentError ? '1px solid #d32f2f' : '1px solid #e0e0e0',
                borderRadius: 1,
                backgroundColor: 'rgba(0,0,0,0.02)'
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={consentGiven}
                      onChange={handleConsentChange}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      {t('aiInsights.consentLabel')}
                    </Typography>
                  }
                />
                {consentError && (
                  <FormHelperText error sx={{ ml: 2 }}>
                    {t('aiInsights.consentError')}
                  </FormHelperText>
                )}
              </FormGroup>
            </Box>

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
              {t('aiInsights.generateButton')}
            </GradientButton>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="600">
        {t('aiInsights.resultTitle')}
      </Typography>

      <Typography variant="body1" paragraph>
        {t('aiInsights.resultDescription')}
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
        <StyledCard
          title={t('aiInsights.medicalTitle')}
          icon={<ScienceIcon />}
          iconColor="#3a8ffe"
          headerColor="#3a8ffe"
          sx={{ height: '100%' }}
        >
          <List sx={{ p: 0 }}>
            {medicalRecommendations.map((recommendation: string, index: number) => (
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
        </StyledCard>

        <StyledCard
          title={t('aiInsights.nutritionTitle')}
          icon={<BarChartIcon />}
          iconColor="#4caf50"
          headerColor="#4caf50"
          sx={{ height: '100%' }}
        >
          <List sx={{ p: 0 }}>
            {(nutritionRecommendations as string[]).map((recommendation: string, index: number) => (
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
        </StyledCard>

        <StyledCard
          title={t('aiInsights.fitnessTitle')}
          icon={<AssessmentIcon />}
          iconColor="#ff9800"
          headerColor="#ff9800" 
          sx={{ height: '100%' }}
        >
          <List sx={{ p: 0 }}>
            {fitnessRecommendations.map((recommendation: string, index: number) => (
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
          {t('aiInsights.resetButton')}
        </GradientButton>
      </Box>
    </Box>
  );
};

export default AiInsights;