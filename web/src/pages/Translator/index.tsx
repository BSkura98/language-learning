import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, IconButton, type SelectChangeEvent, TextField, Typography } from '@mui/material';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import TranslateIcon from '@mui/icons-material/Translate';

import { Select } from '../../components/Select';
import { ButtonContainer, TranslatorPageWrapper } from './styled';

export const Translator = (): JSX.Element => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.translator' });

  const [languageToBeTranslatedFrom, setLanguageToBeTranslatedFrom] = React.useState('auto');
  const [languageToBeTranslatedTo, setLanguageToBeTranslatedTo] = React.useState('en');

  const handleChangeLanguageToBeTranslatedFrom = (event: SelectChangeEvent<unknown>): void => {
    setLanguageToBeTranslatedFrom(event.target.value as string);
  };

  const handleChangeLanguageToBeTranslatedTo = (event: SelectChangeEvent<unknown>): void => {
    setLanguageToBeTranslatedTo(event.target.value as string);
  };

  const handleSwitchLanguages = (): void => {
    setLanguageToBeTranslatedFrom(languageToBeTranslatedTo);
    setLanguageToBeTranslatedTo(languageToBeTranslatedFrom);
  };

  return (
    <>
      <Helmet>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={`${t('pageDescription')}`} />
      </Helmet>
      <TranslatorPageWrapper>
        <Typography variant="h5" gutterBottom>
          {t('translator')}
        </Typography>
        <Grid container spacing={2}>
          <Grid xs={12} md={5.5}>
            <Select
              fullWidth
              size="small"
              id="language-to-be-translated-from"
              label={t('language').toString()}
              menuItemsValues={[
                { value: 'auto', label: t('detect').toString() },
                { value: 'en', label: 'English' },
                { value: 'pl', label: 'Polish' },
              ]}
              value={languageToBeTranslatedFrom}
              onChange={handleChangeLanguageToBeTranslatedFrom}
            />
            <TextField id="text-textfield" label={t('text')} multiline rows={5} fullWidth />
          </Grid>
          <Grid id="reserve-languages-button-grid" xs={12} md={1}>
            <IconButton
              aria-label="reverse-languages"
              onClick={handleSwitchLanguages}
              disabled={languageToBeTranslatedFrom === 'auto'}
              color="primary"
            >
              <SyncAltIcon />
            </IconButton>
          </Grid>
          <Grid xs={12} md={5.5}>
            <Select
              fullWidth
              size="small"
              id="language-to-be-translated-to"
              label={t('language').toString()}
              menuItemsValues={[
                { value: 'en', label: 'English' },
                { value: 'pl', label: 'Polish' },
              ]}
              value={languageToBeTranslatedTo}
              onChange={handleChangeLanguageToBeTranslatedTo}
            />
            <TextField id="translation-textfield" label={t('translation')} multiline rows={5} fullWidth disabled />
          </Grid>
        </Grid>
        <ButtonContainer>
          <Button variant="contained" startIcon={<TranslateIcon />}>
            {t('translate')}
          </Button>
        </ButtonContainer>
      </TranslatorPageWrapper>
    </>
  );
};
