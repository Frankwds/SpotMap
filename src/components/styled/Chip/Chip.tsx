import React from 'react';
import { Chip as MuiChip, ChipProps as MuiChipProps } from '@mui/material';

// Extend MuiChipProps but make some properties optional
type Props = Omit<MuiChipProps, 'children'> & {
  children?: React.ReactNode; // Not directly used by MuiChip
};

export const Chip = ({
  label,
  color,
  size,
  variant,
  onClick,
  onDelete,
  deleteIcon,
  icon,
  disabled,
  clickable,
  sx,
}: Props) => {
  return (
    <MuiChip
      sx={{
        borderRadius: '16px',
        fontSize: '0.75rem',
        fontWeight: 'medium',
        height: 'auto',
        padding: '4px 0',
        '& .MuiChip-label': {
          padding: '0 12px',
        },
        ...sx
      }}
      label={label}
      color={color}
      size={size}
      variant={variant}
      onClick={onClick}
      onDelete={onDelete}
      deleteIcon={deleteIcon}
      icon={icon}
      disabled={disabled}
      clickable={clickable}
      
    />
  );
};