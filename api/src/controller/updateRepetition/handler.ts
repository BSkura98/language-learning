import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { getErrorResponse } from '../../utils/getErrorResponse';
import { getResponse } from '../../utils/getResponse';
import { getRequest } from '../../utils/getRequest';
import { updateRepetitionService } from '../../service/updateRepetition/service';
import { UpdateRepetitionRequest } from '../../service/updateRepetition/request';

export const updateRepetition = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const requestParameters: UpdateRepetitionRequest = getRequest(event, { pathParameters: ['id'] });
    await updateRepetitionService(requestParameters);

    return getResponse(200);
  } catch (error) {
    return getErrorResponse(error);
  }
};
