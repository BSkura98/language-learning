import { APIGatewayProxyResult } from 'aws-lambda';

import { getRepetitionRepository } from '../../repository/repetition.repository';
import { NotFoundError } from '../../errors/NotFoundError';
import { ForbiddenError } from '../../errors/ForbiddenError';
import { DeleteRepetitionRequest } from './request';

export const deleteRepetitionService = async (request: DeleteRepetitionRequest): Promise<APIGatewayProxyResult> => {
  const repetitionRepository = await getRepetitionRepository();

  const repetition = await repetitionRepository.findOneBy({ id: request.id });

  if (!repetition) {
    throw new NotFoundError('Repetition not found');
  }

  if (repetition.userId !== request.userId) {
    new ForbiddenError('You are not authorized to remove this repetition');
  }

  return await repetitionRepository.remove(repetition);
};
