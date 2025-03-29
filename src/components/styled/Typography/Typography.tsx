import React from 'react';
import { Typography as MuiTypography } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  variant?: 'h2' |'h4'| 'h6'|'body1'| 'body2' | 'subtitle1' |'subtitle2'| 'caption';
  sx ?: object;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Typography = (props: Props) => {
  return (
    <MuiTypography
      onClick={props.onClick}
      {...props}
    />
  );
};