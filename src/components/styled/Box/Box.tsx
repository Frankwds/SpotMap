import React from 'react';
import { Box as MuiBox } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  component?: React.ElementType;
  sx?:  object;
}

export const Box = (props: Props) => {
  return (
    <MuiBox
      sx={{}}
      {...props}
    />
  );
};