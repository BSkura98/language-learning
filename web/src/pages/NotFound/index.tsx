import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const NotFound = memo((): JSX.Element => {
  const { t } = useTranslation();

  return <h2>{t('pages.notFound.pageNotFound')}</h2>;
});
