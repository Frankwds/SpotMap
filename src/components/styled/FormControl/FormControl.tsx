import React from 'react';
import { FormControl as MuiFormControl } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
}

export const FormControl = (props: Props) => {
  return (
    <MuiFormControl
      sx={{
        width: '100%',
      }}
      size="small"
      {...props}
    />
  );
};