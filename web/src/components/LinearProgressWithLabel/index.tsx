import React from 'react';
import { Box, LinearProgress, type LinearProgressProps, Typography } from '@mui/material';

interface Props extends LinearProgressProps {
  value: number;
  label?: string;
}

export const LinearProgressWithLabel = ({ value, label, ...props }: Props): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={value} {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {label ?? `${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};
