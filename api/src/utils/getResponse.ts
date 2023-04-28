import { APIGatewayProxyResult } from 'aws-lambda';

export const getResponse = (statusCode: number, body?: APIGatewayProxyResult) => {
  return {
    statusCode,
    body: body ? JSON.stringify(body) : '',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  };
};
