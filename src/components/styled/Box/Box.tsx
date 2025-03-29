import React from 'react';
import { Box as MuiBox } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  component?: React.ElementType;
  sx?:  React.CSSProperties;
}

export const Box = (props: Props) => {
  return (
    <MuiBox
      sx={{}}
      {...props}
    />
  );
};