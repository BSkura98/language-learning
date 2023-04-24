import { APIGatewayProxyEvent } from 'aws-lambda';

import { getUserId } from './getUserId';

export const getRequest = (event: APIGatewayProxyEvent) => ({
  userId: getUserId(event),
  ...JSON.parse(event.body)
});
