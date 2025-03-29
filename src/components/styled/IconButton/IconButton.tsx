import React from 'react';
import { IconButton as MuiIconButton, IconButtonProps as MuiIconButtonProps } from '@mui/material';

interface Props extends MuiIconButtonProps {
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
  style?: React.CSSProperties;
  sx?: any;
}

export const IconButton = (props: Props) => {
  const { sx = {}, ...otherProps } = props;
  
  return (
    <MuiIconButton
      sx={{
        color: theme => theme.palette.text.primary,
        ...sx
      }}
      {...otherProps}
    />
  );
};