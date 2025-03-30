import React from 'react';
import { CardMedia as MuiCardMedia } from '@mui/material';

interface Props {
  component: string
  image?: string;
  alt?: string;
  sx?: object;
  height?: string | number;
}
export const CardMedia: React.FC<Props> = (props) => {
  return <MuiCardMedia {...props} />;
};