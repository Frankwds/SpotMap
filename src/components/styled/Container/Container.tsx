import React from 'react';
import { Container as MuiContainer } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  disableGutters?: boolean;
  sx?: object;
}

export const Container = (props: Props) => {
  return (
    <MuiContainer
      sx={{
        padding: 2,
      }}
      {...props}
    />
  );
};