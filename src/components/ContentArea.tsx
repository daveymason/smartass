import HealthSummary from './HealthSummary';
import AiInsights from './AiInsights';
import Help from './Help';
import { Box } from '@mui/material';
import { mainContentStyles } from '../theme';

interface ContentAreaProps {
  page: string;
  patientId?: string;
  onNavigate: (page: string) => void;
}

function ContentArea({ page, patientId, onNavigate }: ContentAreaProps & { patientId: string }) {
  return ( 
    <Box 
      component="main" 
      sx={mainContentStyles}
      role="main"
      aria-label={`${page} content`}
    >
      {page === 'dashboard' && <HealthSummary patientId={patientId} />}
      {page === 'ai-insights' && <AiInsights />}
      {page === 'help' && <Help onNavigate={onNavigate} />}
      {page !== 'dashboard' && 
       page !== 'ai-insights' && 
       page !== 'help' && 
        <div>Select a menu item</div>}
    </Box>
  );
}

export default ContentArea;