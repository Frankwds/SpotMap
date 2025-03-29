import React from 'react';
import { CardContent as MuiCardContent, CardContentProps as MuiCardContentProps } from '@mui/material';

export type CardContentProps = MuiCardContentProps;

export const CardContent: React.FC<CardContentProps> = (props) => {
  return <MuiCardContent {...props} />;
};