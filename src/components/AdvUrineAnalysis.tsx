// based on https://docs.google.com/document/d/1tUt_kuV5dDs2fzv_gJfw1FNMQLJHICUboDl21oVwgDs/edit?usp=sharing
import React, { useRef, useState, useEffect } from 'react';
import { 
  Box, Typography, Grid, Card, CardContent, 
  Chip, Button, Collapse, Divider, CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { UrineMeasurement } from '../types/healthData';

interface AdvUrineAnalysisProps {
  detailedMetrics?: {
    primary: UrineMeasurement[];
    secondary: UrineMeasurement[];
    advanced: UrineMeasurement[];
  };
  isOpen?: boolean;
  onClose?: () => void;
  standaloneMode?: boolean;
}

const MetricGroup = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(5),
}));

const MetricStatusChip = styled(Chip)<{ statuscolor: string }>(({ theme, statuscolor }) => ({
  backgroundColor: statuscolor,
  color: theme.palette.getContrastText(statuscolor),
  fontSize: '0.75rem',
  height: 24,
}));

const MetricCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

// Function to get color by status
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'normal':
      return '#10b981';
    case 'warning':
      return '#f59e0b'; 
    case 'alert':
      return '#ef4444';
    default:
      return '#6c757d'; 
  }
};

const AdvUrineAnalysis: React.FC<AdvUrineAnalysisProps> = (props) => {
  const { 
    detailedMetrics: propMetrics, 
    standaloneMode = true // Initially wanted to go in Dashboard. 
  } = props;

  const contentRef = useRef<HTMLDivElement>(null);
  
  const [loading, setLoading] = useState(!propMetrics);
  const [error, setError] = useState<string | null>(null);
  const [detailedMetrics, setDetailedMetrics] = useState(propMetrics);
  
  useEffect(() => {
    if (propMetrics) {
      setDetailedMetrics(propMetrics);
      setLoading(false);
      return;
    }
    
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error('Failed to load urine analysis data');
        }
        
        const data = await response.json();
        if (data.urineAnalysis?.detailedMetrics) {
          console.log('Loaded detailed metrics:', data.urineAnalysis.detailedMetrics);
          setDetailedMetrics(data.urineAnalysis.detailedMetrics);
        } else {
          throw new Error('No detailed metrics found in data');
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load detailed urine analysis data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [propMetrics]);
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4, height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error || !detailedMetrics) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">{error || 'No data available'}</Typography>
      </Box>
    );
  }
  
  const hasPrimary = Array.isArray(detailedMetrics.primary) && detailedMetrics.primary.length > 0;
  const hasSecondary = Array.isArray(detailedMetrics.secondary) && detailedMetrics.secondary.length > 0;
  const hasAdvanced = Array.isArray(detailedMetrics.advanced) && detailedMetrics.advanced.length > 0;

  if (standaloneMode) {
    return (
      <Box ref={contentRef} sx={{ p: 3, maxWidth: '100%' }}>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" component="h2" fontWeight="600">
              Detailed Urine Analysis
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          {/* Primary Metrics */}
          {hasPrimary && (
            <MetricGroup>
              <Typography variant="h6" component="h3" fontWeight="600" mb={2}>
                Primary Metrics
              </Typography>
              <Grid container spacing={3}>
                {detailedMetrics.primary.map((metric, index) => (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <MetricCard variant="outlined">
                      <CardContent sx={{ p: 2, flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle1" fontWeight="600">
                            {metric.metric}
                          </Typography>
                          <MetricStatusChip 
                            label={metric.status}
                            statuscolor={getStatusColor(metric.status)}
                            size="small"
                          />
                        </Box>
                        <Typography variant="h6" fontWeight="600" mb={1}>
                          {metric.value} {metric.unit && 
                            <Typography component="span" variant="body2" color="text.secondary">
                              {metric.unit}
                            </Typography>
                          }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {metric.notes}
                        </Typography>
                      </CardContent>
                    </MetricCard>
                  </Grid>
                ))}
              </Grid>
            </MetricGroup>
          )}
          
          {/* Secondary Metrics */}
          {hasSecondary && (
            <MetricGroup>
              <Typography variant="h6" component="h3" fontWeight="600" mb={2}>
                Secondary Metrics
              </Typography>
              <Grid container spacing={2}>
                {detailedMetrics.secondary.map((metric, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <MetricCard variant="outlined">
                      <CardContent sx={{ p: 2, flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle1" fontWeight="600">
                            {metric.metric}
                          </Typography>
                          <MetricStatusChip 
                            label={metric.status}
                            statuscolor={getStatusColor(metric.status)}
                            size="small"
                          />
                        </Box>
                        <Typography variant="h6" fontWeight="600" mb={1}>
                          {metric.value} {metric.unit && 
                            <Typography component="span" variant="body2" color="text.secondary">
                              {metric.unit}
                            </Typography>
                          }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {metric.notes}
                        </Typography>
                      </CardContent>
                    </MetricCard>
                  </Grid>
                ))}
              </Grid>
            </MetricGroup>
          )}
          
          {/* Advanced Metrics */}
          {hasAdvanced && (
            <MetricGroup>
              <Typography variant="h6" component="h3" fontWeight="600" mb={2}>
                Advanced Biomarkers
              </Typography>
              <Grid container spacing={2}>
                {detailedMetrics.advanced.map((metric, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <MetricCard variant="outlined">
                      <CardContent sx={{ p: 2, flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle1" fontWeight="600">
                            {metric.metric}
                          </Typography>
                          <MetricStatusChip 
                            label={metric.status}
                            statuscolor={getStatusColor(metric.status)}
                            size="small"
                          />
                        </Box>
                        <Typography variant="h6" fontWeight="600" mb={1}>
                          {metric.value} {metric.unit && 
                            <Typography component="span" variant="body2" color="text.secondary">
                              {metric.unit}
                            </Typography>
                          }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {metric.notes}
                        </Typography>
                      </CardContent>
                    </MetricCard>
                  </Grid>
                ))}
              </Grid>
            </MetricGroup>
          )}
          
          {/* Fallback message if no sections are available */}
          {!hasPrimary && !hasSecondary && !hasAdvanced && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                Detailed metrics data is not available or is incomplete.
              </Typography>
            </Box>
          )}

      </Box>
    );
  }

  // For embedded mode, add collapse and close button incase we want to include in othe rparts of app like a modal
  return (
    <Collapse in={props.isOpen || false}>
      <Box ref={contentRef}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" component="h2" fontWeight="600">
              Detailed Urine Analysis
            </Typography>
            <Button 
              size="small" 
              onClick={props.onClose}
              startIcon={<KeyboardArrowUpIcon />}
            >
              Close Details
            </Button>
          </Box>

      </Box>
    </Collapse>
  );
};

export default AdvUrineAnalysis;