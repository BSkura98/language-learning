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
  const { startDate, endDate, sourceLanguage, targetLanguage } = requestParameters;

  const repetitions = await repetitionRepository
    .createQueryBuilder('repetition')
    .where('repetition.userId = :userId', { userId: requestParameters.userId })
    .andWhere(startDate ? 'repetition.nextRepetitionDate >= :startDate' : 'TRUE', {
      startDate
    })
    .andWhere(endDate ? 'repetition.nextRepetitionDate <= :endDate' : 'TRUE', {
      endDate: endDate && endOfDay(new Date(endDate))
    })
    .andWhere(sourceLanguage ? 'repetition.sourceLanguage = :sourceLanguage' : 'TRUE', {
      sourceLanguage
    })
    .andWhere(targetLanguage ? 'repetition.targetLanguage = :targetLanguage' : 'TRUE', {
      targetLanguage
    })
    .orderBy(sortBy, sortType)
    .getMany();

  return repetitions;
};
