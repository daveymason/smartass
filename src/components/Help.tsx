import React from 'react';
import {
  Box,
  Typography,
  Divider,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TranslateIcon from '@mui/icons-material/Translate';
import GetAppIcon from '@mui/icons-material/GetApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import { useLanguage } from '../i18n/LanguageContext';
import StyledCard from './ui/StyledCard';
import RecommendationItem from './ui/RecommendationItem';

interface HelpProps {
  onNavigate: (page: string) => void;
}

const Help: React.FC<HelpProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <Box sx={{ padding: 4, maxWidth: 900, mx: 'auto' }}>
      <StyledCard
        title={t('help.title')}
        icon={<HelpOutlineIcon />}
        headerColor="linear-gradient(135deg, #9c27b0, #673ab7)"
        iconColor="#9c27b0"
        sx={{ mb: 4 }}
      >
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
          {t('help.welcome')}
        </Typography>
      </StyledCard>

      <StyledCard
        title={t('help.gettingStarted')}
        icon={<CheckCircleIcon />}
        headerColor="#10b981"
        iconColor="#10b981"
        sx={{ mb: 4 }}
      >
        <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.1rem' }}>
          {t('help.loginProcess')}:
        </Typography>
        
        <RecommendationItem borderColor="#10b981" sx={{ mb: 2 }}>
          <ListItem sx={{ p: 1 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CheckCircleIcon fontSize="small" sx={{ color: '#10b981' }} />
            </ListItemIcon>
            <ListItemText 
              primary={t('help.selectPatient')} 
              primaryTypographyProps={{ fontSize: '1.05rem' }}
            />
          </ListItem>
        </RecommendationItem>
        
        <RecommendationItem borderColor="#10b981" sx={{ mb: 2 }}>
          <ListItem sx={{ p: 1 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CheckCircleIcon fontSize="small" sx={{ color: '#10b981' }} />
            </ListItemIcon>
            <ListItemText 
              primary={t('help.clickLogin')} 
              primaryTypographyProps={{ fontSize: '1.05rem' }}
            />
          </ListItem>
        </RecommendationItem>
        
        <RecommendationItem borderColor="#10b981" sx={{ mb: 2 }}>
          <ListItem sx={{ p: 1 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CheckCircleIcon fontSize="small" sx={{ color: '#10b981' }} />
            </ListItemIcon>
            <ListItemText 
              primary={t('help.redirected')} 
              primaryTypographyProps={{ fontSize: '1.05rem' }}
            />
          </ListItem>
        </RecommendationItem>
      </StyledCard>

      <StyledCard
        title={t('help.healthSummaryTitle')}
        icon={<DashboardIcon />}
        iconColor="#0d6efd"
        sx={{ mb: 4 }}
      >
        <Typography variant="body1" paragraph sx={{ mb: 2, fontSize: '1.1rem' }}>
          {t('help.healthSummaryDesc')}
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
          <FileDownloadIcon color="primary" sx={{ mt: 0.5, mr: 2 }} />
          <Box>
            <Typography variant="h6" gutterBottom>
              {t('help.exportFeature')}
            </Typography>
            
            <Typography variant="body1" paragraph>
              {t('help.exportDesc')}
              {t('help.exportTypes')}

            </Typography>
            
            <RecommendationItem borderColor="#0d6efd">
              <Typography variant="body1" sx={{ p: 1 }}>
                <strong>{t('healthSummary.exportFhir')}:</strong> {t('help.fhirExport')}
              </Typography>
            </RecommendationItem>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => onNavigate('dashboard')}
            sx={{ px: 4, py: 1 }}
          >
            {t('help.goToHealthSummary')}
          </Button>
        </Box>
      </StyledCard>

      <StyledCard
        title={t('help.aiInsightsTitle')}
        icon={<PsychologyIcon />}
        iconColor="#8b5cf6"
        headerColor="linear-gradient(135deg, #6366f1, #8b5cf6)"
        sx={{ mb: 4 }}
      >
        <Typography variant="body1" paragraph sx={{ mb: 2, fontSize: '1.1rem' }}>
          {t('help.aiInsightsDesc')}
        </Typography>
        
        <RecommendationItem borderColor="#8b5cf6" sx={{ my: 3 }}>
          <Typography variant="body1" sx={{ p: 1, fontWeight: 'bold' }}>
            {t('help.consentDesc')}
          </Typography>
        </RecommendationItem>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" gutterBottom>
          {t('aiInsights.whatToExpect')}:
        </Typography>
        
        <Box sx={{ pl: 2, mt: 2 }}>
          <RecommendationItem borderColor="#8b5cf6" sx={{ mb: 2 }}>
            <ListItem sx={{ p: 1 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckCircleIcon fontSize="small" sx={{ color: '#8b5cf6' }} />
              </ListItemIcon>
              <ListItemText 
                primary={t('aiInsights.medicalRecommendations')}
                primaryTypographyProps={{ fontSize: '1.05rem' }}
              />
            </ListItem>
          </RecommendationItem>
          
          <RecommendationItem borderColor="#8b5cf6" sx={{ mb: 2 }}>
            <ListItem sx={{ p: 1 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckCircleIcon fontSize="small" sx={{ color: '#8b5cf6' }} />
              </ListItemIcon>
              <ListItemText 
                primary={t('aiInsights.dietarySuggestions')}
                primaryTypographyProps={{ fontSize: '1.05rem' }}
              />
            </ListItem>
          </RecommendationItem>
          
          <RecommendationItem borderColor="#8b5cf6" sx={{ mb: 2 }}>
            <ListItem sx={{ p: 1 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckCircleIcon fontSize="small" sx={{ color: '#8b5cf6' }} />
              </ListItemIcon>
              <ListItemText 
                primary={t('aiInsights.exerciseRecommendations')}
                primaryTypographyProps={{ fontSize: '1.05rem' }}
              />
            </ListItem>
          </RecommendationItem>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={() => onNavigate('ai-insights')}
            sx={{ px: 4, py: 1 }}
          >
            {t('help.goToAiInsights')}
          </Button>
        </Box>
      </StyledCard>

      <StyledCard
        title={t('help.additionalFeatures')}
        icon={<TranslateIcon />}
        headerColor="#f59e0b"
        iconColor="#f59e0b"
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <TranslateIcon sx={{ mr: 1 }} /> {t('help.languageSettings')}
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ ml: 4, fontSize: '1.05rem' }}>
            {t('help.languageDesc')}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <EmailIcon color="primary" sx={{ mr: 2, fontSize: 28 }} />
            <Typography variant="h6">
              {t('help.needMoreHelp')}
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            gap: 2, 
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            borderRadius: 2,
            bgcolor: 'rgba(13, 110, 253, 0.05)',
            border: '1px solid rgba(13, 110, 253, 0.2)',
            width: '100%',
            maxWidth: 700
          }}>
            <Link 
              href="mailto:dmason43@gatech.edu" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                color: 'primary.main',
                fontWeight: 'medium',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              <EmojiPeopleOutlinedIcon sx={{ mr: 1 }} /> dmason43@gatech.edu
            </Link>
            
            <Link 
              href="mailto:jesposito32@gatech.edu" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: 'primary.main',
                fontWeight: 'medium',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              <PersonOutlineOutlinedIcon sx={{ mr: 1 }} /> jesposito32@gatech.edu
            </Link>
            
            <Link 
              href="mailto:hli378@gatech.edu" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: 'primary.main',
                fontWeight: 'medium',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              <Person2OutlinedIcon sx={{ mr: 1 }} /> hli378@gatech.edu
            </Link>
          </Box>
        </Box>
      </StyledCard>
    </Box>
  );
};

export default Help;
