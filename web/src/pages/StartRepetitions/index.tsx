import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { endOfDay, isPast, parseISO } from 'date-fns';

import { RepetitionsPageWrapper } from './styled';
import Api from '../../api/api';

export const StartRepetitions = (): JSX.Element => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.startRepetitions' });

  const navigate = useNavigate();

  const getRepetitionsQuery = useQuery({
    queryKey: ['getRepetitions'],
    queryFn: async () => await Api.getRepetitions({ endDate: endOfDay(new Date()) }),
  });

  const getOverdueRepetitionsNumber = (): number =>
    getRepetitionsQuery.data?.reduce(
      (number, repetition) => (isPast(endOfDay(parseISO(repetition.nextRepetitionDate))) ? number + 1 : number),
      0,
    ) ?? 0;

  const getLoadingPage = (): JSX.Element => <CircularProgress />;

  const getNoRepetitionsPage = (): JSX.Element => (
    <Typography variant="h6" gutterBottom>
      {t('noRepetitions')}
    </Typography>
  );

  const getStartRepetitionsPage = (): JSX.Element => (
    <>
      <Typography variant="h6" gutterBottom>
        {t('startRepetitionsDescription', {
          repetitions: getRepetitionsQuery.data?.length,
          overdueRepetitions: getOverdueRepetitionsNumber(),
        })}
      </Typography>
      <Button
        variant="contained"
        onClick={e => {
          e.preventDefault();
          navigate('/repetitions', {
            state: {
              repetitions: getRepetitionsQuery.data,
            },
          });
        }}
      >
        {t('startRepetitions')}
      </Button>
    </>
  );

  const getPageContent = (): JSX.Element => {
    if (getRepetitionsQuery.isLoading) return getLoadingPage();
    if (getRepetitionsQuery.data?.length === 0) return getNoRepetitionsPage();
    return getStartRepetitionsPage();
  };

  return (
    <>
      <Helmet>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={`${t('pageDescription')}`} />
      </Helmet>
      <RepetitionsPageWrapper>{getPageContent()}</RepetitionsPageWrapper>
    </>
  );
};
