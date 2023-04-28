import { addDays } from 'date-fns';

import { RepetitionResult } from '../service/updateService/request';

const calculateNewSuccessfulRepetitionsInRow = (
  previousSuccessfulRepetitionsInRow: number,
  repetitionResult: RepetitionResult
): number => {
  switch (repetitionResult) {
    case RepetitionResult.success:
      return previousSuccessfulRepetitionsInRow + 1;
    case RepetitionResult.failure:
      return 0;
    case RepetitionResult.partialSuccess:
    default:
      return previousSuccessfulRepetitionsInRow;
  }
};

const calculateNextRepetitionDate = (successfulRepetitionsInRow: number) => {
  switch (successfulRepetitionsInRow) {
    case 0:
      return addDays(new Date(), 1);
    case 1:
      return addDays(new Date(), 3);
    default:
      return addDays(new Date(), 7 * (successfulRepetitionsInRow - 1));
  }
};

export const calculateNextRepetitionDateAndSuccessfulRepetitions = (
  previousSuccessfulRepetitionsInRow: number,
  repetitionResult: RepetitionResult
) => {
  const successfulRepetitionsInRow = calculateNewSuccessfulRepetitionsInRow(
    previousSuccessfulRepetitionsInRow,
    repetitionResult
  );
  const nextRepetitionDate = calculateNextRepetitionDate(successfulRepetitionsInRow);
  return { nextRepetitionDate, successfulRepetitionsInRow };
};
