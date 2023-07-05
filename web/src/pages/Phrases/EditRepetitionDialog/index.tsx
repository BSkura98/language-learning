import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

import Api from '../../../api/api';
import { type GetRepetitionsResponseElement as Repetition } from '../../../api/responses/getRepetitionsResponseElement';

interface Props {
  open: boolean;
  onClose: () => void;
  repetition: Repetition;
}

export const EditRepetitionDialog = ({ open, onClose, repetition }: Props): JSX.Element => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.phrases.editRepetitionDialog' });
  const queryClient = useQueryClient();

  const [sourceLanguageText, setSourceLanguageText] = useState(repetition?.sourceLanguageText);
  const [targetLanguageText, setTargetLanguageText] = useState(repetition?.targetLanguageText);

  const updateRepetitionMutation = useMutation({
    mutationFn: Api.updateRepetition,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['getRepetitions'] });
      onClose();
    },
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="edit-repetition-dialog-title"
      aria-describedby="edit-repetition-dialog-description"
    >
      <DialogTitle id="edit-repetition-dialog-title">{t('dialogTitle')}</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          id="source-text"
          label={t('sourceTextLabel', { language: repetition?.sourceLanguage })}
          fullWidth
          variant="outlined"
          value={sourceLanguageText}
          onChange={e => setSourceLanguageText(e.target.value)}
          error={!sourceLanguageText}
        />
        <TextField
          margin="normal"
          id="target-dext"
          label={t('targetTextLabel', { language: repetition?.targetLanguage })}
          fullWidth
          variant="outlined"
          value={targetLanguageText}
          onChange={e => setTargetLanguageText(e.target.value)}
          error={!targetLanguageText}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={updateRepetitionMutation.isLoading}>
          {t('close')}
        </Button>
        <Button
          onClick={() => updateRepetitionMutation.mutate({ id: repetition.id, sourceLanguageText, targetLanguageText })}
          disabled={updateRepetitionMutation.isLoading || !sourceLanguageText || !targetLanguageText}
        >
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
