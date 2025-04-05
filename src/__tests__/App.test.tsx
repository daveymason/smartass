import { render, screen } from '@testing-library/react';
import App from '../App';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('App Component', () => {
  test('renders without crashing', () => {
    renderWithTheme(<App />);
  });
  
  test('has default document title', () => {
    renderWithTheme(<App />);
    expect(document.title).toBe('');
  });
  
  test('contains main Layout component', () => {
    renderWithTheme(<App />);
    expect(screen.getByText('Smart Toilet Login')).toBeInTheDocument();
  });
  
  test('has proper theme applied', () => {
    const { container } = renderWithTheme(<App />);
    const primaryColorElements = container.getElementsByClassName('MuiPaper-root');
    expect(primaryColorElements.length).toBeGreaterThan(0);
  });
  

  test('renders accessible elements', () => {
    renderWithTheme(<App />);
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveAttribute('type', 'button'); 
    expect(loginButton).toBeDisabled(); 
  });
});