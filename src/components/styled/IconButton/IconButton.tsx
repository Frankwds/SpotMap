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
  style?: React.CSSProperties;
  sx?: object;
}

export const IconButton = (props: Props) => {

  
  return (
    <MuiIconButton
      sx={{
        color: theme => theme.palette.text.primary,
      }}
      children={props.children}
      color={props.color}
      disabled={props.disabled}
      disableRipple={props.disableRipple}
      edge={props.edge}
      size={props.size}
      onClick={props.onClick}
      aria-controls={props['aria-controls']}
      aria-haspopup={props['aria-haspopup']}
      aria-expanded={props['aria-expanded']}
      style={props.style}
    />
  );
};