import { APIGatewayProxyEvent } from 'aws-lambda';

import { getUserId } from './getUserId';

interface GetRequestOptions {
  pathParameters?: string[];
  queryParameters?: string[];
}

export const getRequest = (event: APIGatewayProxyEvent, options?: GetRequestOptions) => {
  const pathParameters = options?.pathParameters?.map((param) => ({ [param]: event.pathParameters[param] }));
  const queryParameters = options?.queryParameters?.map((param) => ({ [param]: event.queryStringParameters[param] }));
  let sort;
  if (queryParameters && queryParameters['sortBy']) {
    sort = {
      sortBy: queryParameters['sortBy'],
      sortType: queryParameters['sortType']
    };
    delete queryParameters['sortBy'];
    delete queryParameters['sortType'];
  }
  return {
    userId: getUserId(event),
    ...[sort],
    ...pathParameters,
    ...queryParameters,
    ...JSON.parse(event.body)
  };
};
