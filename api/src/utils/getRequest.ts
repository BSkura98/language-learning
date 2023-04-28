import { APIGatewayProxyEvent } from 'aws-lambda';

import { getUserId } from './getUserId';

interface GetRequestOptions {
  pathParameters?: string[];
  queryParameters?: string[];
}

export const getRequest = (event: APIGatewayProxyEvent, options?: GetRequestOptions) => {
  const pathParameters = options?.pathParameters?.map((param) => ({ [param]: event.data.getPathParam(param) }));
  const queryParameters = options?.queryParameters?.map((param) => ({ [param]: event.queryStringParameters[param] }));
  return {
    userId: getUserId(event),
    ...pathParameters,
    ...queryParameters,
    ...JSON.parse(event.body)
  };
};
