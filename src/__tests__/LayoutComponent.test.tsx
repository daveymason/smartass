import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Layout from '../components/Layout';

describe('Layout Component', () => {
  test('initially shows login screen', () => {
    render(
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    );
        expect(screen.getByText('Smart Toilet Login')).toBeInTheDocument();
  });
});