import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, TextField, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useMutation } from 'react-query';
import { Auth } from 'aws-amplify';
import { type CognitoUser } from 'amazon-cognito-identity-js';
import { LoadingButton } from '@mui/lab';

import { LoginForm, Wrapper } from './styled';
import { PasswordTextField } from '../../components/PasswordTextField';

export const LogIn = memo((): JSX.Element => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.logIn' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation<CognitoUser | any, Error>(async () => {
    return await Auth.signIn(email, password);
  });

  return (
    <>
      <Helmet>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={`${t('pageDescription')}`} />
      </Helmet>
      <Wrapper>
        <LoginForm
          onSubmit={e => {
            e.preventDefault();
            mutation.mutate();
          }}
        >
          <Typography variant="h5" gutterBottom>
            {t('title')}
          </Typography>
          {mutation.isSuccess && <p>Success!</p>}
          <TextField
            id="outlined-basic"
            label={t('emailPlaceholder')}
            variant="outlined"
            onChange={e => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <PasswordTextField
            onChange={e => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          {mutation.isError && <Alert severity="error">{mutation.error.message}</Alert>}
          <LoadingButton variant="contained" loading={mutation.isLoading} loadingPosition="start" type="submit">
            {t('logInButton')}
          </LoadingButton>
        </LoginForm>
      </Wrapper>
    </>
  );
});
