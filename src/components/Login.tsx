import { useState } from 'react';
import { 
  Box, Button, Typography, Paper,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

interface LoginProps {
  onLogin: (patientId: string) => void;
}

const patients = [
  { id: '527252', name: 'Patient 1 (Unhealthy)', condition: 'unhealthy' },
  { id: '527314', name: 'Patient 2 (Unhealthy)', condition: 'unhealthy' },
  { id: '527358', name: 'Patient 3 (Unhealthy)', condition: 'unhealthy' },
  { id: '527415', name: 'Patient 4 (Healthy)', condition: 'healthy' },
  { id: '527473', name: 'Patient 5 (Healthy)', condition: 'healthy' },
  { id: '527511', name: 'Patient 6 (Healthy)', condition: 'healthy' },
  { id: '527550', name: 'Patient 7 (Healthy)', condition: 'healthy' },
  { id: '527568', name: 'Patient 8 (Healthy)', condition: 'healthy' },
  { id: '527606', name: 'Patient 9 (Healthy)', condition: 'healthy' },
  { id: '527641', name: 'Patient 10 (Healthy)', condition: 'healthy' },
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