import React from 'react';
import { MobileStepper as MuiMobileStepper } from '@mui/material';

interface Props {
  steps: number;
  position?: 'static' | 'bottom' | 'top';
  activeStep: number;
  nextButton: React.ReactNode;
  backButton: React.ReactNode;
  variant?: 'dots' | 'text' | 'progress';
  sx?: object;
  LinearProgressProps?: object;
}

export const MobileStepper = (props: Props) => {
  return (
    <MuiMobileStepper
      sx={{
        '& .MuiMobileStepper-dot': {
          backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.26)'
        },
        '& .MuiMobileStepper-dotActive': {
          backgroundColor: theme => theme.palette.primary.main
        },
        ...props.sx
      }}
      {...props}
    />
  );
};