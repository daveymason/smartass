import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';
import Login from './Login';
import { Box } from '@mui/material';
import { LanguageProvider } from '../i18n/LanguageContext';

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

  // Render login outside of the Box with navbar and sidebar to mimic real auth
  if (!authenticatedPatient) {
    // Login still needs language context tho
    return (
      <LanguageProvider>
        <Login onLogin={handleLogin} />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <Box sx={{ display: 'flex' }}>
        <Navbar patientId={authenticatedPatient} onLogout={handleLogout} />
        <Sidebar onMenuClick={handleMenuClick} activePage={activePage} />
        <ContentArea 
          page={activePage} 
          patientId={authenticatedPatient} 
          onNavigate={handleMenuClick} 
        />
      </Box>
    </LanguageProvider>
  );
}

export default Layout;