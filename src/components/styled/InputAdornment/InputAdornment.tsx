import React from 'react';
import { InputAdornment as MuiInputAdornment, InputAdornmentProps as MuiInputAdornmentProps } from '@mui/material';

export type InputAdornmentProps = MuiInputAdornmentProps;

export const InputAdornment: React.FC<InputAdornmentProps> = (props) => {
  return <MuiInputAdornment {...props} />;
};