import React from 'react';
import { FormControlLabel as MuiFormControlLabel } from '@mui/material';
import { useDarkMode } from '../../../styles/theme';

interface Props {
  key ?: string;
  control: React.ReactElement;
  label: React.ReactNode;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export const FormControlLabel = (props: Props) => {
    const { isDarkMode } = useDarkMode();
  return (
    <MuiFormControlLabel
      sx={{
        '& .MuiFormControlLabel-label': {
          color: theme => theme.palette.text.primary,
        },
        color: isDarkMode ? "white" : "black",
      }}
      size="small"

      {...props}
    />
  );
};