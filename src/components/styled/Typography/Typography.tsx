import React from 'react';
import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material';

interface Props extends Omit<MuiTypographyProps, 'variant'> {
  children?: React.ReactNode;
  variant?: 'h2' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'subtitle1' | 'subtitle2' | 'caption';
  sx?: object;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  component?: React.ElementType;
  gutterBottom?: boolean;
  color?: string;
}

export const Typography = (props: Props) => {
  return (
    <MuiTypography
      color={props.color || 'text.primary'}
      onClick={props.onClick}
      {...props}
    />
  );
};