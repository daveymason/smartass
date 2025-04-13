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
  import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
  import PsychologyIcon from '@mui/icons-material/Psychology';
  import logo from '../assets/logo.png';
  import { useLanguage } from '../i18n/LanguageContext';

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
  
  interface StyledProps {
    $isActive?: boolean;
  }
  
  const StyledListItem = styled(ListItem)<StyledProps>(({ theme, $isActive }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1, 0),
    marginBottom: theme.spacing(0.5),
    opacity: $isActive ? 1 : 0.85,
    '&:hover': {
      opacity: 1,
    },
  }));
  
  const StyledListButton = styled(ListItemButton)<StyledProps>(({ theme, $isActive }) => ({
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
    opacity: $isActive ? 1 : 0.85,
    '&:hover': {
      opacity: 1,
    },
  }));
  
  const IconContainer = styled(ListItemIcon)<StyledProps>(({ theme, $isActive }) => ({
    minWidth: 'auto',
    color: $isActive ? 'inherit' : theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'center',
  }));
  
  const IconLabel = styled(Typography)<StyledProps>(({ theme, $isActive }) => ({
    fontSize: '0.7rem',
    textAlign: 'center',
    color: $isActive ? theme.palette.primary.main : theme.palette.text.secondary,
    fontWeight: $isActive ? 600 : 400,
    marginTop: theme.spacing(0.5),
    lineHeight: 1.2,
    maxWidth: 70,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }));
  
  const Sidebar: React.FC<SidebarProps> = ({ onMenuClick, activePage }) => {
    const { t } = useLanguage();
    
    const navItems = [
      { id: 'dashboard', label: t('sidebar.dashboard'), icon: <DashboardIcon /> },
      { id: 'ai-insights', label: t('sidebar.aiInsights'), icon: <PsychologyIcon /> },
      { id: 'help', label: t('sidebar.help'), icon: <HelpOutlineIcon /> },
    ];
    
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
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <StyledListItem key={item.id} disablePadding $isActive={isActive}>
                <StyledListButton 
                  selected={isActive}
                  onClick={() => onMenuClick(item.id)}
                  $isActive={isActive}
                  aria-current={isActive ? "page" : undefined}
                >
                  <IconContainer $isActive={isActive}>
                    {item.icon}
                  </IconContainer>
                </StyledListButton>
                <IconLabel $isActive={isActive}>
                  {item.label}
                </IconLabel>
              </StyledListItem>
            );
          })}
        </List>
      </SidebarContainer>
    );
  };
  
  export default Sidebar;