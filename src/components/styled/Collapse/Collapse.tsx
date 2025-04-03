import React from 'react';
import { Collapse as MuiCollapse } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  in?: boolean;
  timeout?: number | 'auto';
  unmountOnExit?: boolean;
}

export const Collapse = (props: Props) => {
  return (
    <MuiCollapse
      timeout={props.timeout || 'auto'}
      {...props}
    />
  );
}; 