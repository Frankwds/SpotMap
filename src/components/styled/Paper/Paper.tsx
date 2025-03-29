import React from 'react';
import { Paper as MuiPaper } from '@mui/material';

interface Props {
  square?: boolean;
  variant?: 'elevation' | 'outlined';
  children?: React.ReactNode;
  // Add any additional props here as needed
}

export const Paper = (props: Props) => {
  return (
    <MuiPaper

      {...props}
    />
  );
};