import React from 'react';
import { IconButton as MuiIconButton } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  color?: 'inherit' | 'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning';
  disabled?: boolean;
  disableRipple?: boolean;
  edge?: 'start' | 'end' | false;
  size?: 'small' | 'medium' | 'large';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  'aria-controls'?: string;
  'aria-haspopup'?: string | boolean;
  'aria-expanded'?: string | boolean;
  // Add any additional props here as needed
}

export const IconButton = (props: Props) => {
  return (
    <MuiIconButton
      sx={{
        color: theme => theme.palette.text.primary,
      }}
      {...props}
    />
  );
};