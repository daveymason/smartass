import { 
    Box, 
    Drawer, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    Typography,
    Divider,
    styled
  } from '@mui/material';
  import DashboardIcon from '@mui/icons-material/Dashboard';
  import BarChartIcon from '@mui/icons-material/BarChart';
  import SettingsIcon from '@mui/icons-material/Settings';
  import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
  import logo from '../assets/logo.png';

  interface SidebarProps {
    onMenuClick: (page: string) => void;
    activePage: string;
  }
  
  const SidebarContainer = styled(Drawer)(({ theme }) => ({
    width: 80,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: 80,
      backgroundColor: theme.palette.background.default,
      borderRight: `1px solid ${theme.palette.divider}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: theme.spacing(2),
    },
  }));
  
  const StyledListItem = styled(ListItem)<{ active?: number }>(({ theme, active }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1, 0),
    marginBottom: theme.spacing(0.5),
    opacity: active ? 1 : 0.85,
    '&:hover': {
      opacity: 1,
    },
  }));
  
  const StyledListButton = styled(ListItemButton)<{ active?: number }>(({ theme, active }) => ({
    borderRadius: '50%',
    minWidth: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    opacity: active ? 1 : 0.85,
    '&:hover': {
      opacity: 1,
    },
  }));
  
  const IconContainer = styled(ListItemIcon)<{ active?: number }>(({ theme, active }) => ({
    minWidth: 'auto',
    color: active ? 'inherit' : theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'center',
  }));
  
  const IconLabel = styled(Typography)<{ active?: number }>(({ theme, active }) => ({
    fontSize: '0.7rem',
    textAlign: 'center',
    color: active ? theme.palette.primary.main : theme.palette.text.secondary,
    fontWeight: active ? 600 : 400,
    marginTop: theme.spacing(0.5),
    lineHeight: 1.2,
    maxWidth: 70,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }));
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChartIcon /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    { id: 'help', label: 'Help', icon: <HelpOutlineIcon /> },
  ];
  
  const Sidebar: React.FC<SidebarProps> = ({ onMenuClick, activePage }) => {
    return (
      <SidebarContainer variant="permanent">
        <Box 
          sx={{
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center', 
            mb: 2,
            mt: 1,
            width: '100%'
          }}
        >
          <img 
            src={logo} 
            alt="Logo" 
            style={{ 
              width: 65, 
              height: 65,
            }} 
          />
        </Box>
        <Divider sx={{ width: '100%' }} />

        
        
        <List sx={{ width: '100%' }}>
          {navItems.map((item) => (
            <StyledListItem key={item.id} disablePadding active={activePage === item.id ? 1 : 0}>
              <StyledListButton 
                selected={activePage === item.id}
                onClick={() => onMenuClick(item.id)}
                active={activePage === item.id ? 1 : 0}
                aria-current={activePage === item.id ? "page" : undefined}
              >
                <IconContainer active={activePage === item.id ? 1 : 0}>
                  {item.icon}
                </IconContainer>
              </StyledListButton>
              <IconLabel active={activePage === item.id ? 1 : 0}>
                {item.label}
              </IconLabel>
            </StyledListItem>
          ))}
        </List>
      </SidebarContainer>
    );
  };
  
  export default Sidebar;