import React from 'react';
import { List as MuiList } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  component?: React.ElementType;
  disablePadding?: boolean;
}

export const List = (props: Props) => {
  return (
    <MuiList
      sx={{
        width: '100%',
      }}
      {...props}
    />
  );
}; 