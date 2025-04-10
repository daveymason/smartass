import React, { ReactNode } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  CardProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const CardContainer = styled(Card)(() => ({
  height: '100%',
  position: 'relative',
  overflow: 'visible',
}));

const StyledCardHeader = styled(CardHeader, {
  shouldForwardProp: (prop) => prop !== 'bgColor',
})<{ bgColor?: string }>(({ bgColor }) => ({
  background: bgColor || 'linear-gradient(135deg, #3a8ffe, #0052cc)',
  paddingLeft: '50px',
  position: 'relative',
  color: 'white',
}));

const IconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color?: string }>(({ theme, color }) => ({
  position: 'absolute',
  left: '-10px',
  top: '-10px',
  background: 'white',
  color: color || theme.palette.primary.main,
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.75rem',
  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.25)',
  border: `3px solid ${color || theme.palette.primary.main}`,
  zIndex: 10, 
  transition: 'all 0.3s ease',
  transform: 'translateZ(5px)',
}));

export interface StyledCardProps extends CardProps {
  title: string;
  icon: ReactNode;
  iconColor?: string;
  headerColor?: string;
  children: ReactNode;
  id?: string;
}


const StyledCard: React.FC<StyledCardProps> = ({
  title,
  icon,
  iconColor,
  headerColor,
  children,
  id,
  ...cardProps
}) => {
  return (
    <CardContainer {...cardProps}>
      <StyledCardHeader 
        title={title} 
        bgColor={headerColor} 
        id={id}
      />
      <IconWrapper color={iconColor}>
        {icon}
      </IconWrapper>
      <CardContent>
        {children}
      </CardContent>
    </CardContainer>
  );
};

export default StyledCard;