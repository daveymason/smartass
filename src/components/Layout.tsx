import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';
import Login from './Login';
import { Box } from '@mui/material';

function Layout() {
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [authenticatedPatient, setAuthenticatedPatient] = useState<string | null>(null);

  const handleMenuClick = (page: string) => {
    setActivePage(page);
  };

  const handleLogin = (patientId: string) => {
    setAuthenticatedPatient(patientId);
  };

  const handleLogout = () => {
    setAuthenticatedPatient(null);
  };

  if (!authenticatedPatient) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar patientId={authenticatedPatient} onLogout={handleLogout} />
      <Sidebar onMenuClick={handleMenuClick} activePage={activePage} />
      <ContentArea page={activePage} patientId={authenticatedPatient} />
    </Box>
  );
}

export default Layout;