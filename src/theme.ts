import { createTheme } from '@mui/material/styles';

const goldenRatio = 1.618;

const space1 = 8;
const space2 = Math.round(space1 * goldenRatio); // ~13px
const space3 = Math.round(space2 * goldenRatio); // ~21px
const space4 = Math.round(space3 * goldenRatio); // ~34px

const textXs = 0.75;
const textSm = textXs * goldenRatio; // ~1.21rem
const textBase = 1;
const textMd = textBase * goldenRatio; // ~1.62rem
const textLg = textMd * goldenRatio; // ~2.62rem

const mainContentStyles = {
  paddingTop: 10, 
  width: 'calc(100% - 80px)',
};

const navbarIconButtonStyles = {
  color: '#ffffff',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Slightly better hover effect
  },
};

const aiRecommendationStyles = {
  backgroundColor: '#f8fafc',
  borderLeft: '4px solid #8b5cf6',
  padding: 4,
  marginTop: 8,
  borderRadius: '0 8px 8px 0',
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#0d6efd',
      light: '#3a8ffe',
      dark: '#0052cc',
    },
    secondary: {
      main: '#0dcaf0',
    },
    error: {
      main: '#ef4444',
    },
    warning: {
      main: '#f59e0b',
    },
    success: {
      main: '#10b981',
    },
    info: {
      main: '#8b5cf6',
      light: '#a78bfa', 
      dark: '#6366f1',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
      disabled: '#6c757d',
    },
    background: {
      default: '#f2f7ff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: 16,
    h1: {
      fontSize: `${textLg}rem`,
      fontWeight: 700,
      lineHeight: goldenRatio,
    },
    h2: {
      fontSize: `${textMd * 1.25}rem`,
      fontWeight: 700,
      lineHeight: goldenRatio,
    },
    h3: {
      fontSize: `${textMd}rem`,
      fontWeight: 600,
      lineHeight: goldenRatio,
    },
    h4: {
      fontSize: `${textBase * 1.25}rem`,
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: `${textBase}rem`,
      fontWeight: 600,
      lineHeight: goldenRatio,
    },
    h6: {
      fontSize: `${textSm}rem`,
      fontWeight: 600,
      lineHeight: goldenRatio,
    },
    subtitle1: {
      fontSize: `${textBase}rem`,
      lineHeight: goldenRatio,
    },
    subtitle2: {
      fontSize: `${textXs * 1.25}rem`,
      fontWeight: 600,
      lineHeight: goldenRatio,
    },
    body1: {
      fontSize: `${textBase}rem`,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: `${textXs + 0.18}rem`,   //eye-balled it
      lineHeight: goldenRatio,
    },
  },
  shape: {
    borderRadius: 8, 
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f2f7ff',
          margin: 0,
          padding: 0,
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 15, 
          boxShadow: '0 10px 20px rgba(0, 123, 255, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 15px 30px rgba(0, 123, 255, 0.2)',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: space3,
          paddingBottom: space3,
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: `${space3}px ${space3}px ${space3}px 50px`, 
          background: 'linear-gradient(135deg, #3a8ffe, #0052cc)',
          color: 'white',
          minHeight: 64,
          position: 'relative',
        },
        title: {
          fontWeight: 600,
          fontSize: `${textSm * 1.2}rem`,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 16,
          '&:last-child': {
            paddingBottom: 16,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, #3a8ffe, #0052cc, #0Baacc, #825EF5)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 16px',
          minHeight: 64,
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.8rem',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }
      }
    },
    
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: `${space2}px 0`,
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          borderBottomWidth: 2,
        },
        root: {
          padding: space2,
        }
      }
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          marginBottom: space4,
          '&.Mui-expanded': {
            marginBottom: space4,
          },
        }
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: space3,
          '&.Mui-expanded': {
            backgroundColor: '#e7f1ff',
            color: '#0d6efd',
          }
        },
        content: {
          '&.Mui-expanded': {
            margin: '12px 0',
          },
        }
      }
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: space3,
        }
      }
    },
  },
});

export { mainContentStyles, aiRecommendationStyles, navbarIconButtonStyles };
export default theme;