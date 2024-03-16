import { endOfDay } from 'date-fns';

import { getRepetitionRepository } from '../../repository/repetition.repository';
import { GetRepetitionsRequest } from './request';
import { getSort } from '../../utils/getSort';
import { getPagination } from '../../utils/getPagination';
import { GetRepetitionsResponse } from './response';

export const getRepetitionsService = async (
  requestParameters: GetRepetitionsRequest
): Promise<GetRepetitionsResponse> => {
  const repetitionRepository = await getRepetitionRepository();
  const { sortBy, sortType } = getSort('repetition', requestParameters.sort);
  const { startDate, endDate, sourceLanguage, targetLanguage } = requestParameters;
  const { skip, take } = getPagination(requestParameters);

  const queryBuilder = repetitionRepository
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
    });

  const repetitions = await queryBuilder.orderBy(sortBy, sortType).skip(skip).take(take).getMany();
  const total = await queryBuilder.getCount();

  return {
    data: repetitions,
    skip,
    take,
    total
  };
};
