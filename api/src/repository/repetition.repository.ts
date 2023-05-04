import { Repository } from 'typeorm';

import { AppDataSource } from '../AppDataSource';
import { Repetition } from '../entity/Repetition';

export const getRepetitionRepository = async (): Promise<Repository<Repetition>> => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  return AppDataSource.getRepository(Repetition);
};
