import React from 'react';
import { Checkbox as MuiCheckbox } from '@mui/material';

interface Props {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  color?: 'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium';
}

export const Checkbox = (props: Props) => {
  return (
    <MuiCheckbox
      sx={{
        color: theme => theme.palette.text.secondary,
        '&.Mui-checked': {
          color: theme => theme.palette.success.main,
        },
      }}
      {...props}
    />
  );
};