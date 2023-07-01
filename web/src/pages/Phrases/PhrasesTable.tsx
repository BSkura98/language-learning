import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { type GetRepetitionsResponseElement } from '../../api/responses/getRepetitionsResponseElement';

interface Props {
  repetitions?: GetRepetitionsResponseElement[];
}

export const PhrasesTable = ({ repetitions }: Props): JSX.Element => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.phrases' });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="phrases table">
        <TableHead>
          <TableRow>
            <TableCell>{t('sourceText')}</TableCell>
            <TableCell>{t('targetText')}</TableCell>
            <TableCell align="right">{t('nextRepetitionDate')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repetitions?.map(repetition => (
            <TableRow
              key={repetition.sourceLanguageText + new Date(repetition.nextRepetitionDate).toISOString()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <b>{repetition.sourceLanguage}</b> {repetition.sourceLanguageText}
              </TableCell>
              <TableCell>
                <b>{repetition.targetLanguage}</b> {repetition.targetLanguageText}
              </TableCell>
              <TableCell align="right">{new Date(repetition.nextRepetitionDate).toDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
