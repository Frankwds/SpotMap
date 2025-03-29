import React from 'react';
import { AppBar as MuiAppBar } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  sx?: object;
}

export const AppBar = (props: Props) => {
  return (
    <MuiAppBar
      position="fixed"
      {...props}
    />
  );
};