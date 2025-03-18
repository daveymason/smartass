import HealthSummary from './HealthSummary';
import { Box } from '@mui/material';
import { mainContentStyles } from '../theme';

interface ContentAreaProps {
  page: string;
  patientId?: string;
}

function ContentArea({ page, patientId }: ContentAreaProps & { patientId: string }) {
    return ( 
    <Box 
    component="main" 
    sx={mainContentStyles}
    role="main"
    aria-label={`${page} content`}
  >
  
      {page === 'dashboard' && <HealthSummary patientId={patientId} />}
      {page === 'export' && <h1>Export Page</h1>}
      {page !== 'dashboard' && page !== 'export' && <div>Select a menu item</div>}
    </Box>
  );
}

export default ContentArea;