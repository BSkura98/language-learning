import { APIGatewayProxyResult } from 'aws-lambda';

import { getRepetitionRepository } from '../../repository/repetition.repository';
import { GetRepetitionRequest } from './request';
import { NotFoundError } from '../../errors/NotFoundError';
import { ForbiddenError } from '../../errors/ForbiddenError';

export const getRepetitionService = async (requestParameters: GetRepetitionRequest): Promise<APIGatewayProxyResult> => {
  const repetitionRepository = await getRepetitionRepository();

  const repetition = await repetitionRepository.findOneBy({ id: requestParameters.id });

  if (!repetition) {
    throw new NotFoundError('Repetition not found');
  }

  if (repetition.userId !== requestParameters.userId) {
    throw new ForbiddenError('You are not authorized to access this repetition');
  }

  return repetition;
};
