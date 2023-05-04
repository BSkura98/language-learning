import { Sort, SortType } from './interfaces/Sort';

export const getSort = (alias: string, sort?: Sort) => ({
  sortBy: `${alias}.${sort?.sortBy || 'createdAt'}`,
  sortType: sort?.sortType || SortType.ascending
});
