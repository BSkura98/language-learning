import { APIGatewayProxyEvent } from 'aws-lambda';

import { getUserId } from './getUserId';

interface GetRequestOptions {
  pathParameters?: string[];
  queryParameters?: string[];
}

export const getRequest = (event: APIGatewayProxyEvent, options?: GetRequestOptions) => {
  const pathParameters = options?.pathParameters?.reduce((params, param) => {
    params[param] = event.pathParameters[param];
    return params;
  }, {});
  const queryParameters = options?.queryParameters?.reduce((params, param) => {
    params[param] = event.queryParameters[param];
    return params;
  }, {});

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
    sort,
    ...pathParameters,
    ...queryParameters,
    ...JSON.parse(event.body)
  };
};
