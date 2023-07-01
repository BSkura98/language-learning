import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { CircularProgress, Typography } from '@mui/material';

import { PageWrapper } from '../../components/PageWrapper/styled';
import Api from '../../api/api';
import { PhrasesTable } from './PhrasesTable';
import { CircularProgressContainer } from './styled';

export const Phrases = (): JSX.Element => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.phrases' });

  const getRepetitionsQuery = useQuery({
    queryKey: ['getRepetitions'],
    queryFn: async () => await Api.getRepetitions(),
  });

  const getLoadingPage = (): JSX.Element => (
    <CircularProgressContainer>
      <CircularProgress />
    </CircularProgressContainer>
  );

  const getLoadedPage = (): JSX.Element => (
    <>
      <Typography variant="h5" gutterBottom>
        {t('savedPhrases')}
      </Typography>
      <PhrasesTable repetitions={getRepetitionsQuery.data} />
    </>
  );

  const getPageContent = (): JSX.Element => {
    if (getRepetitionsQuery.isLoading) return getLoadingPage();
    return getLoadedPage();
  };

  return (
    <>
      <Helmet>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={`${t('pageDescription')}`} />
      </Helmet>
      <PageWrapper>{getPageContent()}</PageWrapper>
    </>
  );
};
