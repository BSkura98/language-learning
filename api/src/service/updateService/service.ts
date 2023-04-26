import { APIGatewayProxyResult } from 'aws-lambda';

import { UpdateRepetitionRequest } from './request';
import { getRepetitionRepository } from '../../repository/repetition.repository';
import { validate } from './validator';
import { calculateNextRepetitionDateAndSuccessfulRepetitions } from '../../helpers/calculateNextRepetitionDateAndSuccessfulRepetitions';
import { NotFoundError } from '../../errors/NotFoundError';
import { ForbiddenError } from '../../errors/ForbiddenError';

export const updateRepetitionService = async (
  id: string,
  body: UpdateRepetitionRequest
): Promise<APIGatewayProxyResult> => {
  validate(body);

  const repetitionRepository = await getRepetitionRepository();

  const repetition = await repetitionRepository.findOneBy({ id });

  if (!repetition) {
    throw new NotFoundError('Repetition not found');
  }

  if (repetition.userId !== body.userId) {
    new ForbiddenError('You are not authorized to modify this repetition');
  }

  if (body.sourceLanguageText) {
    repetition.sourceLanguageText = body.sourceLanguageText;
  }
  if (body.targetLanguageText) {
    repetition.targetLanguageText = body.targetLanguageText;
  }
  if (body.nextRepetitionDate) {
    repetition.nextRepetitionDate = body.nextRepetitionDate;
  }
  if (body.repetitionResult) {
    const { nextRepetitionDate, successfulRepetitionsInRow } = calculateNextRepetitionDateAndSuccessfulRepetitions(
      repetition.successfulRepetitionsInRow,
      body.repetitionResult
    );
    repetition.nextRepetitionDate = nextRepetitionDate;
    repetition.successfulRepetitionsInRow = successfulRepetitionsInRow;
  }

  return await repetitionRepository.save(repetition);
};
