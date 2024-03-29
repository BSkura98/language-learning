import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { type GetRepetitionsResponseElement as Repetition } from '../../api/responses/getRepetitionsResponseElement';
import { DeleteRepetitionDialog } from './DeleteRepetitionDialog';
import { EditRepetitionDialog } from './EditRepetitionDialog';

interface Props {
  repetitions?: Repetition[];
}

export const PhrasesTable = ({ repetitions }: Props): JSX.Element => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.phrases' });
  const [selectedToDeletionRepetitionId, setSelectedToDeletionRepetitionId] = useState<string | null>(null);
  const [selectedToEditionRepetition, setSelectedToEditionRepetition] = useState<Repetition | null>(null);

  const getProperCountryInISO3166 = (country: string): string => {
    switch (country) {
      case 'en':
        return 'gb';
      default:
        return country;
    }
  };

  return (
    <>
      {selectedToEditionRepetition && (
        <EditRepetitionDialog
          open={Boolean(selectedToEditionRepetition)}
          onClose={() => setSelectedToEditionRepetition(null)}
          repetition={selectedToEditionRepetition}
        />
      )}
      {selectedToEditionRepetition && (
        <DeleteRepetitionDialog
          open={Boolean(selectedToDeletionRepetitionId)}
          onClose={() => setSelectedToDeletionRepetitionId(null)}
          repetitionId={selectedToDeletionRepetitionId!}
        />
      )}
      <TableContainer component={Paper} style={{ backgroundColor: '#f6f6f6' }}>
        <Table sx={{ minWidth: 650 }} aria-label="phrases table">
          <TableHead>
            <TableRow>
              <TableCell width="38%">{t('sourceText')}</TableCell>
              <TableCell width="38%">{t('targetText')}</TableCell>
              <TableCell width="14%" align="right">
                {t('nextRepetitionDate')}
              </TableCell>
              <TableCell width="10%%" align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repetitions?.map(repetition => (
              <TableRow
                key={repetition.sourceLanguageText + new Date(repetition.nextRepetitionDate).toISOString()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <span className={`fi fi-${getProperCountryInISO3166(repetition.sourceLanguage)}`}></span>{' '}
                  {repetition.sourceLanguageText}
                </TableCell>
                <TableCell>
                  <span className={`fi fi-${getProperCountryInISO3166(repetition.targetLanguage)}`}></span>{' '}
                  {repetition.targetLanguageText}
                </TableCell>
                <TableCell align="right">{new Date(repetition.nextRepetitionDate).toDateString()}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    onClick={e => {
                      e.preventDefault();
                      setSelectedToEditionRepetition(repetition);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
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
