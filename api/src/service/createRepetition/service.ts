import { APIGatewayProxyResult } from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import { addDays } from 'date-fns';

import { CreateRepetitionRequest } from './request';
import { Repetition } from '../../entity/Repetition';
import { getRepetitionRepository } from '../../repository/repetition.repository';
import { validate } from './validator';

export const createRepetitionService = async (body: CreateRepetitionRequest): Promise<APIGatewayProxyResult> => {
  validate(body);

  const repetitionRepository = await getRepetitionRepository();

  const repetition = Repetition.create({
    ...body,
    id: uuid(),
    successfulRepetitionsInRow: 0,
    nextRepetitionDate: addDays(new Date(), 1)
  });

  return await repetitionRepository.save(repetition);
};
