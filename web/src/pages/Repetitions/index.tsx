import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Box, Button, Stack, TextField } from '@mui/material';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import { type GetRepetitionsResponseElement } from '../../api/responses/getRepetitionsResponseElement';
import { RepetitionsPageWrapper } from './styled';
import { RepetitionResult } from '../../api/requests/updateRepetitionRequest';
import Api from '../../api/api';
import { LinearProgressWithLabel } from '../../components/LinearProgressWithLabel';

type RepetitionWithResult = GetRepetitionsResponseElement & { repetitionResult?: RepetitionResult };

export const Repetitions = (): JSX.Element => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.repetitions' });
  const { state } = useLocation();
  const queryClient = useQueryClient();

  const [remainedRepetitions, setRemainedRepetitions] = useState<RepetitionWithResult[]>(state.repetitions);
  const [completedRepetitionsCounter, setCompletedRepetitionsCounter] = useState(0);
  const [answerRevealed, setAnswerRevealed] = useState(false);

  const currentRepetition = useMemo(() => remainedRepetitions[0], [remainedRepetitions]);
  const navigate = useNavigate();

  const saveRepetitionResultMutation = useMutation({
    mutationFn: Api.updateRepetition,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['getTodaysRepetitions'] });
    },
  });

  const setCurrentRepetitionToQueueEnd = (repetitionResult: RepetitionResult): void => {
    const [currentRepetitions, ...rest] = remainedRepetitions;
    const newRemainedRepetitions = [...rest, { ...currentRepetitions, repetitionResult }];
    setRemainedRepetitions(newRemainedRepetitions);
  };

  const handleResultClick = (e: React.MouseEvent<HTMLElement>, repetitionResult: RepetitionResult): void => {
    e.preventDefault();
    setAnswerRevealed(false);

    if (!currentRepetition.repetitionResult) {
      saveRepetitionResultMutation.mutate({ id: currentRepetition.id, repetitionResult });
    }

    if (repetitionResult === RepetitionResult.success) {
      if (remainedRepetitions.length === 1) {
        navigate('/completedRepetitions');
      }
      setCompletedRepetitionsCounter(completedRepetitionsCounter + 1);
      setRemainedRepetitions(remainedRepetitions.slice(1));
    }
    if (repetitionResult === RepetitionResult.partialSuccess) {
      setCurrentRepetitionToQueueEnd(repetitionResult);
    }
    if (repetitionResult === RepetitionResult.failure) {
      setCurrentRepetitionToQueueEnd(repetitionResult);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={`${t('pageDescription')}`} />
      </Helmet>
      <RepetitionsPageWrapper $variant="narrow">
        <Box sx={{ width: '100%' }}>
          <LinearProgressWithLabel
            value={(completedRepetitionsCounter / state.repetitions.length) * 100}
            label={`${completedRepetitionsCounter}/${state.repetitions.length as number}`}
          />
        </Box>
        <TextField
          multiline
          rows={5}
          fullWidth
          value={currentRepetition.sourceLanguageText}
          label={currentRepetition.sourceLanguage}
          disabled
        />
        <Button
          variant="contained"
          onClick={e => {
            e.preventDefault();
            setAnswerRevealed(true);
          }}
          startIcon={<QuestionAnswerIcon />}
        >
          {t('revealAnswer', { targetLanguage: currentRepetition.targetLanguage })}
        </Button>
        {answerRevealed && (
          <>
            <TextField
              multiline
              rows={5}
              fullWidth
              value={currentRepetition.targetLanguageText}
              label={currentRepetition.targetLanguage}
              disabled
            />
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={e => handleResultClick(e, RepetitionResult.failure)}
                color="error"
                startIcon={<SentimentVeryDissatisfiedIcon />}
              >
                {t('bad')}
              </Button>
              <Button
                variant="outlined"
                onClick={e => handleResultClick(e, RepetitionResult.partialSuccess)}
                startIcon={<SentimentNeutralIcon />}
              >
                {t('average')}
              </Button>
              <Button
                variant="outlined"
                onClick={e => handleResultClick(e, RepetitionResult.success)}
                color="success"
                startIcon={<SentimentSatisfiedAltIcon />}
              >
                {t('good')}
              </Button>
            </Stack>
          </>
        )}
      </RepetitionsPageWrapper>
    </>
  );
};
