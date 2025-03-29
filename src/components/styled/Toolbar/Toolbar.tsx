import React from 'react';
import { Toolbar as MuiToolbar } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  disableGutters?: boolean;
  variant?: 'regular' | 'dense';
  // Add any additional props here as needed
}

export const Toolbar = (props: Props) => {
  return (
    <MuiToolbar
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      {...props}
    />
  );
};