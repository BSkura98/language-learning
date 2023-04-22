import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { getErrorResponse } from '../../utils/getErrorResponse';
import { getResponse } from '../../utils/getResponse';
import { CreateRepetitionRequest } from '../../service/createRepetition/request';
import { createRepetitionService } from '../../service/createRepetition/service';
import { getRequest } from '../../utils/getRequestBody';

export const createRepetition = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const body: CreateRepetitionRequest = getRequest(event);
    const result = await createRepetitionService(body);

    return getResponse(201, result);
  } catch (error) {
    return getErrorResponse(error);
  }
};
