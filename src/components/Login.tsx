import { useState } from 'react';
import { 
  Box, Button, Typography, Paper,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

interface LoginProps {
  onLogin: (patientId: string) => void;
}

const patients = [
  { id: '46591294', name: 'Patient 1 (Unhealthy)', condition: 'unhealthy' },
  { id: '46591419', name: 'Patient 2 (Unhealthy)', condition: 'unhealthy' },
  { id: '46591581', name: 'Patient 3 (Unhealthy)', condition: 'unhealthy' },
  { id: '46591802', name: 'Patient 4 (Healthy)', condition: 'healthy' },
  { id: '46592018', name: 'Patient 5 (Healthy)', condition: 'healthy' },
  { id: '46592352', name: 'Patient 6 (Healthy)', condition: 'healthy' },
  { id: '46591894', name: 'Patient 7 (Healthy)', condition: 'healthy' },
  { id: '46592240', name: 'Patient 8 (Healthy)', condition: 'healthy' },
  { id: '46592408', name: 'Patient 9 (Healthy)', condition: 'healthy' },
  { id: '46592652', name: 'Patient 10 (Healthy)', condition: 'healthy' },
];

function Login({ onLogin }: LoginProps) {
  const [selectedPatient, setSelectedPatient] = useState('');

  const handleLogin = () => {
    if (selectedPatient) {
      onLogin(selectedPatient);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          width: '100%', 
          maxWidth: 400,
          borderRadius: 2
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Smart Toilet Login
        </Typography>
        
        <FormControl fullWidth margin="normal">
          <InputLabel id="patient-select-label">Select Patient</InputLabel>
          <Select
            labelId="patient-select-label"
            value={selectedPatient}
            label="Select Patient"
            onChange={(e) => setSelectedPatient(e.target.value)}
          >
            {patients.map((patient) => (
              <MenuItem 
                key={patient.id} 
                value={patient.id}
              >
                {patient.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button 
          variant="contained" 
          fullWidth 
          size="large" 
          onClick={handleLogin}
          disabled={!selectedPatient}
          sx={{ mt: 3 }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;