import React from 'react';
import { Divider as MuiDivider } from '@mui/material';

interface Props {
  absolute?: boolean;
  flexItem?: boolean;
  light?: boolean;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'fullWidth' | 'inset' | 'middle';
  // Add any additional props here as needed
}

export const Divider = (props: Props) => {
  return (
    <MuiDivider
      sx={{
        borderColor: theme => theme.palette.divider,
        my: 1,
      }}
      {...props}
    />
  );
};