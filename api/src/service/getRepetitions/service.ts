import { APIGatewayProxyResult } from 'aws-lambda';
import { endOfDay } from 'date-fns';

import { getRepetitionRepository } from '../../repository/repetition.repository';
import { GetRepetitionsRequest } from './request';
import { getSort } from '../../utils/getSort';

export const getRepetitionsService = async (
  requestParameters: GetRepetitionsRequest
): Promise<APIGatewayProxyResult> => {
  const repetitionRepository = await getRepetitionRepository();
  const { sortBy, sortType } = getSort('repetition', requestParameters.sort);

  const repetitions = repetitionRepository
    .createQueryBuilder('repetition')
    .where('repetition.userId = :userId', { userId: requestParameters.userId })
    .where('repetition.nextRepetitionDate >= :startDate', { startDate: requestParameters.startDate })
    .where('repetition.nextRepetitionDate <= :endDate', {
      endDate: requestParameters.endDate ? endOfDay(requestParameters.endDate) : ''
    })
    .where('repetition.sourceLanguage = :sourceLanguage', { sourceLanguage: requestParameters.sourceLanguage })
    .where('repetition.targetLanguage = :targetLanguage', { targetLanguage: requestParameters.targetLanguage })
    .orderBy(sortBy, sortType)
    .getMany();

  return repetitions;
};
