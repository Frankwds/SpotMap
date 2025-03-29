import React from 'react';
import { Select as MuiSelect } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  label?: string;
  native?: boolean;
  onChange?: (event: React.ChangeEvent<{ value: unknown }>, child: React.ReactNode) => void;
  value?: unknown;

}

export const Select = (props: Props) => {
  return (
    <MuiSelect
      sx={{
        "& .MuiSelect-select": {
          color: theme => theme.palette.text.primary,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme => theme.palette.text.primary,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme => theme.palette.text.primary,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme => theme.palette.success.main,
        }
      }}
      {...props}
    />
  );
};