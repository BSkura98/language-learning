import { APIGatewayProxyResult } from 'aws-lambda';

export const hello = async (): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({message: 'Hello world'})
  };
};
