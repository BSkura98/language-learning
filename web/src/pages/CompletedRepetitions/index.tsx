import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@mui/material';

import { CompletedRepetitionsPageWrapper } from './styled';

export const CompletedRepetitions = (): JSX.Element => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.completedRepetitions' });

  return (
    <>
      <Helmet>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={`${t('pageDescription')}`} />
      </Helmet>
      <CompletedRepetitionsPageWrapper>
        <Typography variant="h6" gutterBottom>
          {t('completedRepetitionsMessage')}
        </Typography>
      </CompletedRepetitionsPageWrapper>
    </>
  );
};
