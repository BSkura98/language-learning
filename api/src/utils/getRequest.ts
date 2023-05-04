import { APIGatewayProxyEvent } from 'aws-lambda';

import { getUserId } from './getUserId';

interface GetRequestOptions {
  pathParameters?: string[];
  queryParameters?: string[];
}

export const getRequest = (event: APIGatewayProxyEvent, options?: GetRequestOptions) => {
  const pathParameters = event.pathParameters;
  if (pathParameters) {
    options?.pathParameters?.forEach((parameter) => {
      if (!(parameter in pathParameters)) {
        delete pathParameters[parameter];
      }
    });
  }
  const queryParameters = event.queryStringParameters;
  if (queryParameters) {
    options?.queryParameters?.forEach((parameter) => {
      if (!(parameter in queryParameters)) {
        delete queryParameters[parameter];
      }
    });
  }

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
