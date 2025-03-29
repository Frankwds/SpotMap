import React from 'react';
import { CircularProgress as MuiCircularProgress } from '@mui/material';

interface Props {
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
  disableShrink?: boolean;
  size?: number | string;
  thickness?: number;
  value?: number;
  variant?: 'determinate' | 'indeterminate';
  // Add any additional props here as needed
}

export const CircularProgress = (props: Props) => {
  return (
    <MuiCircularProgress
      sx={{
        // Default styling for CircularProgress
      }}
      {...props}
    />
  );
};