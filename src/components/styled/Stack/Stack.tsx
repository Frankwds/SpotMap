import React from 'react';
import { Stack as MuiStack } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  spacing?: number;
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  // Add any additional props here as needed
}

export const Stack = (props: Props) => {
  return (
    <MuiStack
      sx={{
        // Default styling for Stack
      }}
      {...props}
    />
  );
};