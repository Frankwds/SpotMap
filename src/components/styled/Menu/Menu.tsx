import React from 'react';
import { Menu as MuiMenu } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  anchorEl?: null | HTMLElement;
  id?: string;
  onClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
  open: boolean;
  transformOrigin?: {
    horizontal: 'left' | 'center' | 'right' | number;
    vertical: 'top' | 'center' | 'bottom' | number;
  };
  anchorOrigin?: {
    horizontal: 'left' | 'center' | 'right' | number;
    vertical: 'top' | 'center' | 'bottom' | number;
  };
  // Add any additional props here as needed
}

export const Menu = (props: Props) => {
  return (
    <MuiMenu
      sx={{
        '& .MuiPaper-root': {
          borderRadius: 1,
          boxShadow: theme => theme.shadows[3],
        },
      }}
      {...props}
    />
  );
};