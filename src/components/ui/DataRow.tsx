import React from 'react';
import { Box, Typography, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const Row = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 0',
  borderBottom: '1px solid #f0f0f0',
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const Label = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
}));

const Value = styled(Typography)(() => ({
  fontWeight: 600,
}));

export interface DataRowProps extends BoxProps {
  label: string;
  value: string | number;
}

const DataRow: React.FC<DataRowProps> = ({ 
  label, 
  value,
  ...boxProps 
}) => {
  return (
    <Row {...boxProps}>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Row>
  );
};

export default DataRow;