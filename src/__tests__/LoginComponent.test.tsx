import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Login from '../components/Login';

describe('Login Component', () => {
  test('renders login form correctly', () => {
    const mockOnLogin = jest.fn();
    
    render(
      <ThemeProvider theme={theme}>
        <Login onLogin={mockOnLogin} />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Smart Toilet Login')).toBeInTheDocument();
    expect(screen.getByLabelText(/select patient/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('login button is disabled until patient is selected', () => {
    const mockOnLogin = jest.fn();
    
    render(
      <ThemeProvider theme={theme}>
        <Login onLogin={mockOnLogin} />
      </ThemeProvider>
    );
    
    expect(screen.getByRole('button', { name: /login/i })).toBeDisabled();
  });
});