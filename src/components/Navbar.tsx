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
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { navbarIconButtonStyles } from '../theme';
import LogoutIcon from '@mui/icons-material/Logout';

const RightSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12, 
});

interface NavbarProps {
  patientId: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ patientId, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  return (
    <AppBar position="fixed"> 
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          .
        </Typography>
        
        <RightSection>
          
          <Tooltip title="Profile">
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
            Patient ID: {patientId}
          </Typography>
        </Box>
        
        <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
        <MenuItem onClick={handleSignOut}>
          <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
          Sign Out
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;