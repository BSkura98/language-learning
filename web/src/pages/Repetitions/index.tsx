import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button, Stack, TextField, Typography } from '@mui/material';

import { type GetRepetitionsResponseElement } from '../../api/responses/getRepetitionsResponseElement';
import { RepetitionsPageWrapper } from './styled';

export const Repetitions = (): JSX.Element => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.repetitions' });
  const { state } = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [completedRepetitions, setCompletedRepetitions] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentRepetition, setCurrentRepetition] = useState<GetRepetitionsResponseElement>(state.repetitions[0]);
  const [answerRevealed, setAnswerRevealed] = useState(false);

  // TODO proper handling of result and moving to next repetition
  const handleResultClick = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    setCompletedRepetitions(1);
    setCurrentRepetition(state.repetitions[1]);
    setAnswerRevealed(false);
  };

  return (
    <>
      <Helmet>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={`${t('pageDescription')}`} />
      </Helmet>
      <RepetitionsPageWrapper $variant="narrow">
        <Typography variant="subtitle1">
          {t('completedRepetitionsInformation', {
            completedRepetitions,
            allRepetitions: state.repetitions.length,
          })}
        </Typography>
        <TextField multiline rows={5} fullWidth value={currentRepetition.sourceLanguageText} disabled />
        <Button
          variant="contained"
          onClick={e => {
            e.preventDefault();
            setAnswerRevealed(true);
          }}
        >
          {t('revealAnswer')}
        </Button>
        {!answerRevealed || (
          <>
            <TextField multiline rows={5} fullWidth value={currentRepetition.targetLanguageText} disabled />
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={handleResultClick} color="error">
                {t('bad')}
              </Button>
              <Button variant="outlined" onClick={handleResultClick}>
                {t('average')}
              </Button>
              <Button variant="outlined" onClick={handleResultClick} color="success">
                {t('good')}
              </Button>
            </Stack>
          </>
        )}
      </RepetitionsPageWrapper>
    </>
  );
};
