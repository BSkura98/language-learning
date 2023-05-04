/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyEvent } from 'aws-lambda';
import jwt_decode from 'jwt-decode';

export const getUserId = (event: APIGatewayProxyEvent) => {
  const authorizationHeader = event.headers.Authorization;

  if (!authorizationHeader) {
    return undefined;
  }

  const jwtDecoded = <any>jwt_decode(event.headers.Authorization.split(' ')[1]);

  if (jwtDecoded.sub) return jwtDecoded.sub;
};
