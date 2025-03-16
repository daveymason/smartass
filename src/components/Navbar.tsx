import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';
import { navbarIconButtonStyles } from '../theme';

const RightSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12, 
});

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSettingsAnchorEl(null);
  };

  return (
    <AppBar position="fixed"> 
      <Toolbar>
        <Box sx={{ width: 40 }} />
        
        <RightSection>
          <Tooltip title="Settings">
            <IconButton 
              size="large"
              onClick={handleSettingsMenuOpen}
              aria-controls="settings-menu"
              aria-haspopup="true"
              aria-label="Open settings menu"
              sx={navbarIconButtonStyles} 
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          
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
                src="/user-avatar.png" 
                sx={{ 
                  width: 32, 
                  height: 32,
                  border: '2px solid #ffffff' 
                }}
              />
            </IconButton>
          </Tooltip>
        </RightSection>
      </Toolbar>
      
      <Menu
        id="settings-menu"
        anchorEl={settingsAnchorEl}
        keepMounted
        open={Boolean(settingsAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>App Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Notification Preferences</MenuItem>
        <MenuItem onClick={handleMenuClose}>Privacy Controls</MenuItem>
      </Menu>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;