import { APIGatewayProxyResult } from 'aws-lambda';

import { Repetition } from '../../entity/Repetition';

export interface GetRepetitionsResponse extends APIGatewayProxyResult {
  data: Repetition[];
  total: number;
  skip?: number;
  take?: number;
}
