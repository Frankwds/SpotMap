import React from 'react';
import { Rating as MuiRating, RatingProps as MuiRatingProps } from '@mui/material';

export type RatingProps = MuiRatingProps;

export const Rating: React.FC<RatingProps> = (props) => {
  return <MuiRating {...props} />;
};