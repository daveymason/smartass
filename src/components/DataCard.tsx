import { Card, CardContent, Typography } from '@mui/material';

interface DataCardProps {
  title: string;
  value: string;
  unit?: string;
}

function DataCard({ title, value, unit }: DataCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5">
          {value} {unit}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DataCard;