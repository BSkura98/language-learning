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
  const { t } = useTranslation('translation', { keyPrefix: 'pages.repetitions' });

  const navigate = useNavigate();

  const getRepetitionsQuery = useQuery({
    queryKey: ['getRepetitions'],
    queryFn: async () => await Api.getRepetitions({ endDate: endOfDay(new Date()) }),
  });

  const getOverdueRepetitionsNumber = (): number =>
    getRepetitionsQuery.data?.reduce((number, repetition) => {
      if (isPast(endOfDay(parseISO(repetition.nextRepetitionDate)))) {
        return number + 1;
      }
      return number;
    }, 0) ?? 0;

  const getLoadingPage = (): JSX.Element => <CircularProgress />;

  const getLoadedPage = (): JSX.Element => (
    <>
      <Typography variant="h6" gutterBottom>
        {t('startRepetitionsDescription', {
          repetitions: getRepetitionsQuery.data?.length,
          overdueRepetitions: getOverdueRepetitionsNumber(),
        })}
      </Typography>
      <Button
        variant="contained"
        style={{ marginTop: '1.5rem' }}
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

  return (
    <>
      <Helmet>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={`${t('pageDescription')}`} />
      </Helmet>
      <RepetitionsPageWrapper>
        {getRepetitionsQuery.isLoading ? getLoadingPage() : getLoadedPage()}
      </RepetitionsPageWrapper>
    </>
  );
};
