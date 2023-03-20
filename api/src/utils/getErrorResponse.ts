import { RequestError } from '../errors/RequestError';

const getErrorMessage = (error: RequestError) => {
  if (error.message) {
    return error.message;
  }

  if (!error.statusCode || error.statusCode === 500) {
    return 'Internal Server Error';
  }

  return `Error ${error.statusCode}`;
};

export const getErrorResponse = (error: RequestError) => ({
  statusCode: error.statusCode ?? 500,
  body: JSON.stringify({ message: getErrorMessage(error) })
});
