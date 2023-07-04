import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { type GetRepetitionsResponseElement } from '../../api/responses/getRepetitionsResponseElement';
import { DeleteRepetitionDialog } from './DeleteRepetitionDialog';

interface Props {
  repetitions?: GetRepetitionsResponseElement[];
}

export const PhrasesTable = ({ repetitions }: Props): JSX.Element => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.phrases' });
  const [selectedToDeletionRepetitionId, setSelectedToDeletionRepetitionId] = useState<string | null>(null);

  return (
    <>
      <DeleteRepetitionDialog
        open={Boolean(selectedToDeletionRepetitionId)}
        onClose={() => setSelectedToDeletionRepetitionId(null)}
        repetitionId={selectedToDeletionRepetitionId!}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="phrases table">
          <TableHead>
            <TableRow>
              <TableCell width="40%">{t('sourceText')}</TableCell>
              <TableCell width="40%">{t('targetText')}</TableCell>
              <TableCell width="15%" align="right">
                {t('nextRepetitionDate')}
              </TableCell>
              <TableCell width="5%" align="right"></TableCell>
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
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    onClick={e => {
                      e.preventDefault();
                      setSelectedToDeletionRepetitionId(repetition.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
