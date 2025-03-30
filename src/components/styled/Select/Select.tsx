import React from 'react';
import { Select as MuiSelect, SelectChangeEvent } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  label?: string;
  native?: boolean;
  onChange?:(e: SelectChangeEvent<string>) => void;
  value?: string;
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
      children ={props.children}
      label={props.label}
      native={props.native}
      onChange={props.onChange}
      value={props.value}
      
    />
  );
};