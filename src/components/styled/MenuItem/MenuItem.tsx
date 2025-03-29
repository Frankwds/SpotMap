import React from 'react';
import { MenuItem as MuiMenuItem } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  key ?: string | number;
  value?: string | number;
  onClick?: () => void;
}

export const MenuItem = (props: Props) => {
  return (
    <MuiMenuItem
      key={props.key}
      value={props.value}
      onClick={props.onClick}
      sx={{}}
      {...props}
    />
  );
};