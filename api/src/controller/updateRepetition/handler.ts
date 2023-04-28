import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { getErrorResponse } from '../../utils/getErrorResponse';
import { getResponse } from '../../utils/getResponse';
import { getRequest } from '../../utils/getRequest';
import { updateRepetitionService } from '../../service/updateService/service';
import { UpdateRepetitionRequest } from '../../service/updateService/request';

export const updateRepetition = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const requestParameters: UpdateRepetitionRequest = getRequest(event, { pathParameters: ['id'] });
    const result = await updateRepetitionService(requestParameters);

    return getResponse(200, result);
  } catch (error) {
    return getErrorResponse(error);
  }
};
