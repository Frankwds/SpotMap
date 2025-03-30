import React from 'react';
import { Avatar as MuiAvatar } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  alt?: string;
  src?: string;
  variant?: 'circular' | 'rounded' | 'square';
  // Add any additional props here as needed
}

export const Avatar = (props: Props) => {
  return (
    <MuiAvatar
      sx={{
        width: 32, height: 32,
        mr: 1, fontSize: "0.875rem"
      }}
      {...props}
    />
  );
};