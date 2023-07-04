import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import Api from '../../../api/api';

interface Props {
  open: boolean;
  onClose: () => void;
  repetitionId: string;
}

export const DeleteRepetitionDialog = ({ open, onClose, repetitionId }: Props): JSX.Element => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.phrases.deleteRepetitionDialog' });
  const queryClient = useQueryClient();

  const deleteRepetitionMutation = useMutation({
    mutationFn: Api.deleteRepetition,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['getRepetitions'] });
      onClose();
    },
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-repetition-dialog-title"
      aria-describedby="delete-repetition-dialog-description"
    >
      <DialogTitle id="delete-repetition-dialog-title">{t('dialogTitle')}</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-repetition-dialog-description">{t('dialogDescription')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={deleteRepetitionMutation.isLoading}>
          {t('no')}
        </Button>
        <Button
          onClick={() => deleteRepetitionMutation.mutate(repetitionId)}
          disabled={deleteRepetitionMutation.isLoading}
        >
          {t('yes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
