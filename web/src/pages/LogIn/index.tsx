/* eslint-disable */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, TextField, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { LoginForm, Wrapper } from './styled';
import { PasswordTextField } from '../../components/PasswordTextField';

export const LogIn = memo((): JSX.Element => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.logIn' });

  return (
    <>
      <Helmet>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={`${t('pageDescription')}`} />
      </Helmet>
      <Wrapper>
        <LoginForm>
          <Typography variant="h5" gutterBottom>
            {t('title')}
          </Typography>
          <TextField id="outlined-basic" label={t('emailPlaceholder')} variant="outlined" />
          <PasswordTextField />
          <Button variant="contained">{t('logInButton')}</Button>
        </LoginForm>
      </Wrapper>
    </>
  );
});
