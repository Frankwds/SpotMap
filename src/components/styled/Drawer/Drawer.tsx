import React from 'react';
import { Drawer as MuiDrawer } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  open?: boolean;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  variant?: 'permanent' | 'persistent' | 'temporary';
  onClose?: () => void;
}
const DRAWER_WIDTH = 280;
export const Drawer = (props: Props) => {
  return (
    <MuiDrawer
      sx={{
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          border: "none",
          boxShadow: 3,
          backgroundColor: theme => theme.palette.background.paper,
        },
      }}
      {...props}
    />
  );
};