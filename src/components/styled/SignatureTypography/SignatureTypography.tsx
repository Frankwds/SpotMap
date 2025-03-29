import React from 'react';
import { Typography } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline';
  component?: React.ElementType;
  // Add any additional props here as needed
}

export const SignatureTypography = (props: Props) => {
  return (
    <Typography
      sx={{
        fontFamily: "'Dancing Script', cursive",
        fontSize: '0.8rem',
        fontStyle: 'italic',
        textAlign: 'center',
        color: theme => theme.palette.text.secondary,
      }}
      {...props}
    />
  );
};