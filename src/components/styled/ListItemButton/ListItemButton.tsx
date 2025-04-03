import React from 'react';
import { ListItemButton as MuiListItemButton } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  sx?: object;
}

export const ListItemButton = (props: Props) => {
  return (
    <MuiListItemButton
      onClick={props.onClick}
      sx={props.sx}
      {...props}
    />
  );
}; 