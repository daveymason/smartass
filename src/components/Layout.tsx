import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';
import { Box } from '@mui/material';

function Layout() {
  const [activePage, setActivePage] = useState<string>('dashboard');

  const handleMenuClick = (page: string) => {
    setActivePage(page);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Sidebar onMenuClick={handleMenuClick} activePage={activePage} />
      <ContentArea page={activePage} />
    </Box>
  );
}

export default Layout;