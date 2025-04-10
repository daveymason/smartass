import React, { ReactNode } from 'react';
import { Box, Typography, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledRecommendation = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'borderColor',
})<{ borderColor?: string }>(({ theme, borderColor }) => ({
  backgroundColor: '#f8fafc',
  borderLeft: `4px solid ${borderColor || theme.palette.info.main}`,
  padding: theme.spacing(1),
  marginTop: theme.spacing(1),
  borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
}));

export interface RecommendationItemProps extends BoxProps {
  children: ReactNode | string;
  borderColor?: string;
  variant?: 'body1' | 'body2' | 'subtitle1' | 'subtitle2';
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({ 
  children, 
  borderColor,
  variant = 'body2',
  ...boxProps 
}) => {
  return (
    <StyledRecommendation borderColor={borderColor} {...boxProps}>
      {typeof children === 'string' ? (
        <Typography variant={variant}>{children}</Typography>
      ) : (
        children
      )}
    </StyledRecommendation>
  );
};

export default RecommendationItem;