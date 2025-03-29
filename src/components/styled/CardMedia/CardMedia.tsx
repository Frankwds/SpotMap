import React from 'react';
import { CardMedia as MuiCardMedia, CardMediaProps as MuiCardMediaProps } from '@mui/material';

export type CardMediaProps = MuiCardMediaProps;

export const CardMedia: React.FC<CardMediaProps> = (props) => {
  return <MuiCardMedia {...props} />;
};