import React from 'react';
import { InputLabel as MuiInputLabel } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  variant?: 'outlined' | 'standard' | 'filled';
}

export const InputLabel = (props: Props) => {
  return (
    <MuiInputLabel
      children={{}}
      {...props}
      color={'success'}
    />
  );
};