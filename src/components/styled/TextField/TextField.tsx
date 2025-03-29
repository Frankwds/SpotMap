import React from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';

interface Props extends Omit<MuiTextFieldProps, 'color'> {
  text?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  InputProps?: any;
  fullWidth?: boolean;
  sx?: any;
}

export const TextField = (props: Props) => {
  const { sx = {}, ...otherProps } = props;

  return (
    <MuiTextField
      sx={{
        '& .MuiInputBase-input': {
          color: theme => theme.palette.text.primary,
        },
        '& .MuiInputLabel-root': {
          color: theme => theme.palette.text.primary,
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: theme => theme.palette.text.primary,
          },
          '&:hover fieldset': {
            borderColor: theme => theme.palette.text.primary,
          },
          '&.Mui-focused fieldset': {
            borderColor: theme => theme.palette.success.main,
          },
        },
        ...sx
      }}
      color="success"
      size="small"
      {...otherProps}
    />
  );
};