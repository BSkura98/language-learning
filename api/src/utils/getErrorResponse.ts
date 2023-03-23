import { RequestError } from '../errors/RequestError';
import { getResponse } from './getResponse';

const getErrorMessage = (error: RequestError) => {
  if (error.message) {
    return error.message;
  }

  if (!error.statusCode || error.statusCode === 500) {
    return 'Internal Server Error';
  }

  return `Error ${error.statusCode}`;
};

export const getErrorResponse = (error: RequestError) => getResponse(
  error.statusCode ?? 500,
  JSON.stringify({ message: getErrorMessage(error) })
);
