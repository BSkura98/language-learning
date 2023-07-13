import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, type SelectChangeEvent, TextField, Stack } from '@mui/material';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import TranslateIcon from '@mui/icons-material/Translate';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';

import { Select } from '../../components/Select';
import { Heading, ReverseLanguagesButton, TranslateButtonContainer, TranslatorPageWrapper } from './styled';
import Api from '../../api/api';

export const Translator = (): JSX.Element => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.translator' });
  const queryClient = useQueryClient();

  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const [addingRepetitionEnabled, setAddingRepetitionEnabled] = useState(false);

  const getSupportedLanguagesQuery = useQuery({
    queryKey: ['getSupportedLanguages'],
    queryFn: Api.getSupportedLanguages,
  });

  const translateMutation = useMutation({
    mutationFn: Api.translate,
    onSuccess: data => {
      setTranslatedText(data.TranslatedText);
      setSourceLanguage(data.SourceLanguageCode);
      setAddingRepetitionEnabled(true);
    },
  });

  const addRepetitionMutation = useMutation({
    mutationFn: Api.createRepetition,
    onSuccess: () => {
      toast.success(t('repetitionSuccessfullyAdded'));
      void queryClient.invalidateQueries({ queryKey: ['getRepetitions'] });
    },
    onError: () => toast.success(t('repetitionNotCreated')),
  });

  const handleChangeSourceLanguage = (event: SelectChangeEvent<unknown>): void => {
    setAddingRepetitionEnabled(false);
    setSourceLanguage(event.target.value as string);
  };

  const handleChangeTargetLanguage = (event: SelectChangeEvent<unknown>): void => {
    setAddingRepetitionEnabled(false);
    setTargetLanguage(event.target.value as string);
  };

  const handleSwitchLanguages = (): void => {
    setAddingRepetitionEnabled(false);
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  const handleTranslate = (): void => {
    translateMutation.mutate({
      sourceLanguageCode: sourceLanguage,
      targetLanguageCode: targetLanguage,
      text,
    });
  };

  const handleAddRepetition = (): void => {
    setAddingRepetitionEnabled(false);
    addRepetitionMutation.mutate({
      sourceLanguage,
      targetLanguage,
      sourceLanguageText: text,
      targetLanguageText: translatedText,
    });
  };

  return (
    <>
      <Helmet>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={`${t('pageDescription')}`} />
      </Helmet>
      <TranslatorPageWrapper>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Heading variant="h6" gutterBottom>
            {t('translator')}
          </Heading>
          <Button
            variant="text"
            startIcon={<AddIcon />}
            disabled={!addingRepetitionEnabled}
            onClick={handleAddRepetition}
          >
            {t('addRepetition')}
          </Button>
        </Stack>
        <Grid container spacing={2}>
          <Grid xs={12} md={5.5}>
            <Select
              fullWidth
              size="small"
              id="source-language"
              label={t('language').toString()}
              menuItemsValues={[{ value: 'auto', label: t('detect').toString() }].concat(
                getSupportedLanguagesQuery.data?.Languages.filter(language => language.LanguageCode !== 'auto').map(
                  language => ({
                    value: language.LanguageCode,
                    label: language.LanguageName,
                  }),
                ) ?? [],
              )}
              value={sourceLanguage}
              onChange={handleChangeSourceLanguage}
              disabled={getSupportedLanguagesQuery.isLoading}
            />
            <TextField
              id="text-textfield"
              label={t('text')}
              multiline
              rows={5}
              fullWidth
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </Grid>
          <Grid id="reverse-languages-button-grid" xs={12} md={1}>
            <ReverseLanguagesButton
              aria-label="reverse-languages"
              onClick={handleSwitchLanguages}
              disabled={sourceLanguage === 'auto'}
              color="primary"
            >
              <SyncAltIcon />
            </ReverseLanguagesButton>
          </Grid>
          <Grid xs={12} md={5.5}>
            <Select
              fullWidth
              size="small"
              id="target-language"
              label={t('language').toString()}
              menuItemsValues={
                getSupportedLanguagesQuery.data?.Languages.filter(language => language.LanguageCode !== 'auto').map(
                  language => ({
                    value: language.LanguageCode,
                    label: language.LanguageName,
                  }),
                ) ?? []
              }
              value={targetLanguage}
              onChange={handleChangeTargetLanguage}
              disabled={getSupportedLanguagesQuery.isLoading}
            />
            <TextField
              id="translation-textfield"
              label={t('translation')}
              value={translatedText}
              multiline
              rows={5}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
        <TranslateButtonContainer>
          <Button
            variant="contained"
            startIcon={<TranslateIcon />}
            disabled={getSupportedLanguagesQuery.isLoading || translateMutation.isLoading}
            onClick={handleTranslate}
            value={translateMutation.data?.TranslatedText}
          >
            {t('translate')}
          </Button>
        </TranslateButtonContainer>
      </TranslatorPageWrapper>
    </>
  );
};
