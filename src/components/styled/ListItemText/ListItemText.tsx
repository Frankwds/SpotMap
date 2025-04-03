import React from 'react';
import { ListItemText as MuiListItemText } from '@mui/material';

interface Props {
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
}

export const ListItemText = (props: Props) => {
  return (
    <MuiListItemText
      primary={props.primary}
      secondary={props.secondary}
    />
  );
}; 