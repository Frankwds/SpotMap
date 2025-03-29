import React from 'react';
import { TextField as MuiTextField,  } from '@mui/material';

interface Props {
  text ?: string;
  placeholder ?: string;
  label ?: string;
  value ?: string;
  onChange ?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = (props: Props) => {
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
      }}
      color="success"
      size="small"
      {...props}
      
    />
  );
};