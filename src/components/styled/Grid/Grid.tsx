import React from 'react';
import { Grid as MuiGrid, GridProps as MuiGridProps } from '@mui/material';

export type GridProps = MuiGridProps;

export const Grid: React.FC<GridProps> = (props) => {
  return <MuiGrid {...props} />;
};