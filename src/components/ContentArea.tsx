import HealthSummary from './HealthSummary';
import { Box } from '@mui/material';
import { mainContentStyles } from '../theme';

interface ContentAreaProps {
  page: string;
}

function ContentArea({ page }: ContentAreaProps) {
  return ( 
    <Box 
    component="main" 
    sx={mainContentStyles}
    role="main"
    aria-label={`${page} content`}
  >
  
      {page === 'dashboard' && <HealthSummary />}
      {page === 'export' && <h1>Export Page</h1>}
      {page !== 'dashboard' && page !== 'export' && <div>Select a menu item</div>}
    </Box>
  );
}

export default ContentArea;