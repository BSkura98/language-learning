import { APIGatewayProxyResult } from 'aws-lambda';

import { UpdateRepetitionRequest } from './request';
import { getRepetitionRepository } from '../../repository/repetition.repository';
import { validate } from './validator';
import { calculateNextRepetitionDateAndSuccessfulRepetitions } from '../../helpers/calculateNextRepetitionDateAndSuccessfulRepetitions';
import { NotFoundError } from '../../errors/NotFoundError';
import { ForbiddenError } from '../../errors/ForbiddenError';
import { Repetition } from '../../entity/Repetition';

export const updateRepetitionService = async (
  requestParameters: UpdateRepetitionRequest
): Promise<APIGatewayProxyResult> => {
  validate(requestParameters);
  const {
    id,
    userId,
    repetitionResult,
    ...parameters
  }: UpdateRepetitionRequest & { successfulRepetitionsInRow?: number } = requestParameters;

  const repetitionRepository = await getRepetitionRepository();

  const repetition = await repetitionRepository.findOneBy({ id });

  if (!repetition) {
    throw new NotFoundError('Repetition not found');
  }

  if (repetition.userId !== userId) {
    throw new ForbiddenError('You are not authorized to modify this repetition');
  }

  if (repetitionResult) {
    const { nextRepetitionDate, successfulRepetitionsInRow } = calculateNextRepetitionDateAndSuccessfulRepetitions(
      repetition.successfulRepetitionsInRow,
      repetitionResult
    );
    parameters.nextRepetitionDate = nextRepetitionDate;
    parameters.successfulRepetitionsInRow = successfulRepetitionsInRow;
  }

  return await repetitionRepository
    .createQueryBuilder('repetition')
    .update(Repetition)
    .set(parameters)
    .where('id = :id', { id })
    .execute();
};
