import React from 'react';
import { Button as MuiButton } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'inherit';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean; 
  startIcon?: React.ReactNode;
  textTransform?: 'none';
}

export const Button = (props: Props) => {
  return (
    <MuiButton
      sx={{
        textTransform: props.textTransform,
        width: '100%',
        marginTop: '8px',
        fontWeight: 'bold',
        '&.MuiButton-containedPrimary': {
          backgroundColor: theme => theme.palette.success.main,
          '&:hover': {
            backgroundColor: theme => theme.palette.success.dark,
          },
        }, 
        '&.MuiButton-containedSecondary': {
          backgroundColor: theme => theme.palette.error.main,
          '&:hover': {
            backgroundColor: theme => theme.palette.error.dark,
          },
        }
      }}
      variant="contained"
      
      {...props}
    />
  );
};