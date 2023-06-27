import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@mui/material';

import { FinishedRepetitionsPageWrapper } from './styled';

export const FinishedRepetitions = (): JSX.Element => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.finishedRepetitions' });

  return (
    <>
      <Helmet>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={`${t('pageDescription')}`} />
      </Helmet>
      <FinishedRepetitionsPageWrapper>
        <Typography variant="h6" gutterBottom>
          {t('completedRepetitionsMessage')}
        </Typography>
      </FinishedRepetitionsPageWrapper>
    </>
  );
};
