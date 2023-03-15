import React, { memo, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, TextField, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

import { LoginForm, Wrapper } from './styled';
import { PasswordTextField } from '../../components/PasswordTextField';
import { AccountContext } from '../../utils/cognito/Account';

export const LogIn = memo((): JSX.Element => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.logIn' });
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { authenticate } = useContext(AccountContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setLoading(true);
    setError('');
    authenticate(email, password)
      .then(() => {
        setLoading(false);
        navigate('/translator');
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={`${t('pageDescription')}`} />
      </Helmet>
      <Wrapper>
        <LoginForm onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom>
            {t('title')}
          </Typography>
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
          {error !== '' && <Alert severity="error">{error}</Alert>}
          <LoadingButton variant="contained" loading={loading} loadingPosition="start" type="submit">
            {t('logInButton')}
          </LoadingButton>
        </LoginForm>
      </Wrapper>
    </>
  );
});
