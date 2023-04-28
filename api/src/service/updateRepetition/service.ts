import { APIGatewayProxyResult } from 'aws-lambda';

import { UpdateRepetitionRequest } from './request';
import { getRepetitionRepository } from '../../repository/repetition.repository';
import { validate } from './validator';
import { calculateNextRepetitionDateAndSuccessfulRepetitions } from '../../helpers/calculateNextRepetitionDateAndSuccessfulRepetitions';
import { NotFoundError } from '../../errors/NotFoundError';
import { ForbiddenError } from '../../errors/ForbiddenError';

export const updateRepetitionService = async (
  requestParameters: UpdateRepetitionRequest
): Promise<APIGatewayProxyResult> => {
  validate(requestParameters);

  const repetitionRepository = await getRepetitionRepository();

  const repetition = await repetitionRepository.findOneBy({ id: requestParameters.id });

  if (!repetition) {
    throw new NotFoundError('Repetition not found');
  }

  if (repetition.userId !== requestParameters.userId) {
    throw new ForbiddenError('You are not authorized to modify this repetition');
  }

  if (requestParameters.sourceLanguageText) {
    repetition.sourceLanguageText = requestParameters.sourceLanguageText;
  }
  if (requestParameters.targetLanguageText) {
    repetition.targetLanguageText = requestParameters.targetLanguageText;
  }
  if (requestParameters.nextRepetitionDate) {
    repetition.nextRepetitionDate = requestParameters.nextRepetitionDate;
  }
  if (requestParameters.repetitionResult) {
    const { nextRepetitionDate, successfulRepetitionsInRow } = calculateNextRepetitionDateAndSuccessfulRepetitions(
      repetition.successfulRepetitionsInRow,
      requestParameters.repetitionResult
    );
    repetition.nextRepetitionDate = nextRepetitionDate;
    repetition.successfulRepetitionsInRow = successfulRepetitionsInRow;
  }

  return await repetitionRepository.save(repetition);
};
