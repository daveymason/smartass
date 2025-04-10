import { useState, useEffect } from 'react';
import { 
  Grid, Typography, Box, 
  CircularProgress, Button, Menu, MenuItem
} from '@mui/material';

import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SpaIcon from '@mui/icons-material/Spa';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import PsychologyIcon from '@mui/icons-material/Psychology';
import GetAppIcon from '@mui/icons-material/GetApp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { usePDF } from 'react-to-pdf';

import { HealthData } from '../types/healthData';
import { useFhirExporter } from './FhirExporter'; 
import StyledCard from './ui/StyledCard';
import DataRow from './ui/DataRow';
import RecommendationItem from './ui/RecommendationItem';
import { useLanguage } from '../i18n/LanguageContext';

interface HealthSummaryProps {
  patientId: string;
}

function HealthSummary({ patientId }: HealthSummaryProps) {
  const { t } = useLanguage();
  
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const { toPDF, targetRef } = usePDF({
    filename: `health_data_${patientId}_${new Date().toISOString().split('T')[0]}.pdf`,
    page: { margin: 20 }
  });

  const { exportFHIR } = useFhirExporter(healthData, patientId); 
  
  const handleExportClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleExportClose = () => {
    setAnchorEl(null);
  };
  
  const handleExportJSON = () => {
    if (!healthData) return;
    
    const dataStr = JSON.stringify(healthData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileName = `health_data_${patientId}_${new Date().toISOString().split('T')[0]}.json`;
    
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', dataUri);
    downloadLink.setAttribute('download', exportFileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    handleExportClose();
  };
  
  const handleExportPDF = () => {
    toPDF();
    handleExportClose();
  };
  
  const handleExportFHIR = () => {
    exportFHIR();
    handleExportClose();
  };

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const isProduction = window.location.hostname !== 'localhost';
        const baseUrl = isProduction 
          ? 'https://smarttoilet.jordanesposito.dev' 
          : '';
        
        const response = await fetch(`${baseUrl}/api/formatted-observations/${patientId}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch health data');
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setHealthData(data);
      } catch (err: any) {
        setError(t('common.error'));
        console.error('Error fetching health data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthData();
  }, [patientId, t]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '70vh',
          padding: 4,
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            padding: 4,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            maxWidth: 400,
            width: '100%',
          }}
        >
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" color="primary">
            {t('common.loading')}
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error || !healthData) {
    return <Typography color="error">{error || t('common.error')}</Typography>;
  }

  return (
    <Box ref={targetRef} sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          {t('healthSummary.title')} - {t('healthSummary.patientId')}: {patientId}
        </Typography>
        
        <div>
          <Button 
            variant="outlined" 
            color="primary" 
            startIcon={<GetAppIcon />}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={handleExportClick}
            aria-controls="export-menu"
            aria-haspopup="true"
          >
            {t('healthSummary.export')}
          </Button>
          <Menu
            id="export-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleExportClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleExportJSON}>{t('healthSummary.exportJson')}</MenuItem>
            <MenuItem onClick={handleExportPDF}>{t('healthSummary.exportPdf')}</MenuItem>
            <MenuItem onClick={handleExportFHIR}>{t('healthSummary.exportFhir')}</MenuItem>
          </Menu>
        </div>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <StyledCard 
            title={t('healthSummary.urineAnalysis')}
            icon={<WaterDropIcon fontSize="large" />}
            id="urine-analysis-title"
          >
            <DataRow label={t('healthSummary.phLevel')} value={healthData.urineAnalysis.pHLevel} />
            <DataRow label={t('healthSummary.glucose')} value={healthData.urineAnalysis.Glucose} />
            <DataRow label={t('healthSummary.protein')} value={healthData.urineAnalysis.Protein} />
            <DataRow label={t('healthSummary.leukocytes')} value={healthData.urineAnalysis.Leukocytes} />
            <DataRow label={t('healthSummary.nitrites')} value={healthData.urineAnalysis.Nitrites} />
            <DataRow label={t('healthSummary.microalbumin')} value={healthData.urineAnalysis.Microalbumin} />
            <DataRow label={t('healthSummary.creatinine')} value={healthData.urineAnalysis.Creatinine} />
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StyledCard 
            title={t('healthSummary.stoolAnalysis')}
            icon={<SpaIcon fontSize="large" />}
            iconColor="#10b981"
            id="stool-analysis-title"
          >
            <DataRow label={t('healthSummary.consistency')} value={healthData.stoolAnalysis.Consistency} />
            <DataRow label={t('healthSummary.blood')} value={healthData.stoolAnalysis.Blood} />
            <DataRow label={t('healthSummary.calprotectin')} value={healthData.stoolAnalysis.Calprotectin} />
            <DataRow label={t('healthSummary.m2pk')} value={healthData.stoolAnalysis.M2PK} />
            <DataRow label={t('healthSummary.fatContent')} value={healthData.stoolAnalysis.FatContent} />
            <DataRow label={t('healthSummary.elastase')} value={healthData.stoolAnalysis.Elastase} />
            <DataRow label={t('healthSummary.parasites')} value={healthData.stoolAnalysis.Parasites} />
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StyledCard 
            title={t('healthSummary.physicalMarkers')}
            icon={<MonitorHeartIcon fontSize="large" />}
            iconColor="#0dcaf0"
            headerColor="linear-gradient(135deg, #0dcaf0, #0a97b7)"
            id="physical-markers-title"
          >
            <DataRow label={t('healthSummary.heartRate')} value={healthData.physicalMarkers.HeartRate} />
            <DataRow label={t('healthSummary.temperature')} value={healthData.physicalMarkers.Temperature} />
            <DataRow label={t('healthSummary.weight')} value={healthData.physicalMarkers.Weight} />
            <DataRow label={t('healthSummary.bodyFat')} value={healthData.physicalMarkers.BodyFat} />
            <DataRow label={t('healthSummary.hydration')} value={healthData.physicalMarkers.Hydration} />
            <DataRow label={t('healthSummary.sitToStand')} value={healthData.physicalMarkers.SitToStand} />
            <DataRow label={t('healthSummary.balance')} value={healthData.physicalMarkers.Balance} />
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StyledCard 
            title={t('healthSummary.aiInsights')}
            icon={<PsychologyIcon fontSize="large" />}
            iconColor="#8b5cf6"
            headerColor="linear-gradient(135deg, #6366f1, #8b5cf6)"
            id="ai-insights-title"
          >
            <Typography variant="body1" paragraph>
              {healthData.aiInsights.summary}
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 2 }}>
              {t('healthSummary.recommendations')}:
            </Typography>
            {healthData.aiInsights.recommendations.map((recommendation, index) => (
              <RecommendationItem 
                key={index} 
                borderColor="#8b5cf6"
              >
                {recommendation}
              </RecommendationItem>
            ))}
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HealthSummary;