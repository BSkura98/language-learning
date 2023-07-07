import React from 'react';
import { Button, type ButtonProps } from '@mui/material';

interface Props extends ButtonProps {
  key: string;
  label: string;
  selected: boolean;
}

export const AppBarButton = ({ key, label, selected, ...props }: Props): JSX.Element => {
  return (
    <Button
      key={key}
      sx={{ my: 2, color: 'white', display: 'block' }}
      style={{ fontWeight: selected ? 'bold' : 'normal' }}
      {...props}
    >
      {label}
    </Button>
  );
};
