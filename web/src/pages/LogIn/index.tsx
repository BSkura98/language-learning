import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const LogIn = memo((): JSX.Element => {
  const { t } = useTranslation();

  return <h2>{t('pages.logIn.logIn')}</h2>;
});
