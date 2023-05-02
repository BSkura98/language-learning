export enum SortType {
  ascending = 'ASC',
  descending = 'DESC'
}

export interface Sort {
  sortBy: string;
  sortType?: SortType;
}
