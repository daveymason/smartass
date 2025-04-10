import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Dialog,
  DialogContent,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import { navbarIconButtonStyles } from '../theme';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';
import { useLanguage } from '../i18n/LanguageContext';

const RightSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12, 
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    overflow: 'visible',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    maxWidth: 450, 
  },
}));

const DialogHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #3a8ffe, #0052cc)',
  color: 'white',
  padding: theme.spacing(2),
  paddingLeft: theme.spacing(7),
  position: 'relative',
}));

const DialogIconWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '-10px',
  top: '-10px',
  background: 'white',
  color: theme.palette.primary.main,
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.75rem',
  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.25)',
  border: `3px solid ${theme.palette.primary.main}`,
  zIndex: 10,
  transition: 'all 0.3s ease',
  transform: 'translateZ(5px)',
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const SettingsSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
}));

interface NavbarProps {
  patientId: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ patientId, onLogout }) => {
  const { language, setLanguage, t } = useLanguage();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tempLanguage, setTempLanguage] = useState(language);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleMenuClose();
    onLogout();
  };
  
  const handleOpenSettings = () => {
    handleMenuClose();
    setTempLanguage(language);
    setSettingsOpen(true);
  };
  
  const handleCloseSettings = () => {
    setSettingsOpen(false);
  };
  
  const handleSaveSettings = () => {
    setLanguage(tempLanguage);
    setSettingsOpen(false);
  };

  return (
    <AppBar position="fixed"> 
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          .
        </Typography>
        
        <RightSection>
          <Tooltip title={t('navbar.profile')}>
            <IconButton
              size="large"
              edge="end"
              aria-controls="profile-menu"
              aria-haspopup="true"
              aria-label="Open profile menu"
              onClick={handleProfileMenuOpen}
              sx={navbarIconButtonStyles} 
            >
              <Avatar 
                alt="User Profile" 
                sx={{ 
                  width: 40, 
                  height: 40,
                  border: '2px solid #ffffff',
                }}
              />
            </IconButton>
          </Tooltip>
        </RightSection>
      </Toolbar>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <Box sx={{ 
          px: 2, 
          py: 1, 
          borderBottom: '1px solid #eaeaea', 
          backgroundColor: '#f5f8ff',
          mb: 1
        }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            {t('healthSummary.patientId')}: {patientId}
          </Typography>
        </Box>
        
        <MenuItem onClick={handleOpenSettings}>
          <SettingsIcon fontSize="small" sx={{ mr: 1 }} />
          {t('common.settings')}
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
          {t('common.signOut')}
        </MenuItem>
      </Menu>
      
      <StyledDialog
        open={settingsOpen} 
        onClose={handleCloseSettings}
      >
        <Paper elevation={3} sx={{ overflow: 'visible' }}>
          <DialogHeader>
            <Typography variant="h6">{t('common.settings')}</Typography>
            <DialogIconWrapper>
              <SettingsIcon fontSize="large" />
            </DialogIconWrapper>
          </DialogHeader>
          
          <StyledDialogContent>
            <SettingsSection>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LanguageIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">{t('common.language')}</Typography>
              </Box>
              
              <FormControl component="fieldset">
                <RadioGroup
                  value={tempLanguage}
                  onChange={(e) => setTempLanguage(e.target.value as 'english' | 'chinese')}
                >
                  <FormControlLabel value="english" control={<Radio />} label="English" />
                  <FormControlLabel value="chinese" control={<Radio />} label="Chinese (中文)" />
                </RadioGroup>
              </FormControl>
            </SettingsSection>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button 
                onClick={handleCloseSettings} 
                sx={{ mr: 1 }}
              >
                {t('common.cancel')}
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSaveSettings}
              >
                {t('common.save')}
              </Button>
            </Box>
          </StyledDialogContent>
        </Paper>
      </StyledDialog>
    </AppBar>
  );
};

export default Navbar;