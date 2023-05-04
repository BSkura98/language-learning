import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { getErrorResponse } from '../../utils/getErrorResponse';
import { getResponse } from '../../utils/getResponse';
import { getRequest } from '../../utils/getRequest';
import { GetRepetitionRequest } from '../../service/getRepetition/request';
import { getRepetitionService } from '../../service/getRepetition/service';

export const getRepetition = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const requestParameters: GetRepetitionRequest = getRequest(event, {
      pathParameters: ['id']
    });

    const repetition = await getRepetitionService(requestParameters);

    return getResponse(200, repetition);
  } catch (error) {
    return getErrorResponse(error);
  }
};
