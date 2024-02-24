import { BaseRequest } from './interfaces/BaseRequest';

export const getPagination = (request?: BaseRequest) => {
  if (request?.pagination) {
    return request.pagination;
  }
  return { skip: 0, take: undefined };
};
