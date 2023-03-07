import React, { memo, useState } from 'react';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';
import { type OutlinedInputProps } from '@mui/material/OutlinedInput/OutlinedInput';

export const PasswordTextField = memo((props: OutlinedInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'components.passwordTextField' });

  const handleClickShowPassword = (): void => {
    setShowPassword(show => !show);
  };

  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">{t('password')}</InputLabel>
      <OutlinedInput
        {...props}
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={e => {
                e.preventDefault();
              }}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={`${t('password')}`}
      />
    </FormControl>
  );
});
