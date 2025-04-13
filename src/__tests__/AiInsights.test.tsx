import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import AiInsights from '../components/AiInsights';

describe('AiInsights Component', () => {
    test('renders initial consent form', () => {
        render(
            <ThemeProvider theme={theme}>
                <AiInsights />
            </ThemeProvider>
        );
        
        expect(screen.getByText('AI Health Insights')).toBeInTheDocument();
        expect(screen.getByText(/I consent to my health data being processed/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /generate ai insights/i })).toBeInTheDocument();
    });
    
    test('shows error when trying to generate insights without consent', () => {
        render(
            <ThemeProvider theme={theme}>
                <AiInsights />
            </ThemeProvider>
        );
        
        fireEvent.click(screen.getByRole('button', { name: /generate ai insights/i }));
        expect(screen.getByText(/you must provide consent/i)).toBeInTheDocument();
    });
    
    test('generates insights after giving consent', async () => {
        render(
            <ThemeProvider theme={theme}>
                <AiInsights />
            </ThemeProvider>
        );
        
        fireEvent.click(screen.getByRole('checkbox'));
        
        fireEvent.click(screen.getByRole('button', { name: /generate ai insights/i }));
        
        expect(screen.getByText(/analyzing your health data/i)).toBeInTheDocument();
        
        await waitFor(() => {
            expect(screen.getByText('Your AI Health Insights')).toBeInTheDocument();
        }, { timeout: 3000 });
        
        expect(screen.getByText('Medical Recommendations')).toBeInTheDocument();
        expect(screen.getByText('Nutrition Recommendations')).toBeInTheDocument();
        expect(screen.getByText('Fitness Recommendations')).toBeInTheDocument();
    });
    
    test('displays correct information sections before generating insights', () => {
        render(
            <ThemeProvider theme={theme}>
                <AiInsights />
            </ThemeProvider>
        );
        
        expect(screen.getByText('What to Expect')).toBeInTheDocument();
        expect(screen.getByText(/Medical recommendations based on your test results/i)).toBeInTheDocument();
        expect(screen.getByText(/Dietary suggestions to improve health markers/i)).toBeInTheDocument();
        expect(screen.getByText(/Exercise and lifestyle recommendations/i)).toBeInTheDocument();
    });
    
    test('consent checkbox can be checked and unchecked', () => {
        render(
            <ThemeProvider theme={theme}>
                <AiInsights />
            </ThemeProvider>
        );
        
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
        
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
        
        fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });
    
    test('error message disappears after consent is given', () => {
        render(
            <ThemeProvider theme={theme}>
                <AiInsights />
            </ThemeProvider>
        );
        
        fireEvent.click(screen.getByRole('button', { name: /generate ai insights/i }));
        expect(screen.getByText(/you must provide consent/i)).toBeInTheDocument();
        
        fireEvent.click(screen.getByRole('checkbox'));
        expect(screen.queryByText(/you must provide consent/i)).not.toBeInTheDocument();
    });
});