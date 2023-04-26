import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { getErrorResponse } from '../../utils/getErrorResponse';
import { getResponse } from '../../utils/getResponse';
import { CreateRepetitionRequest } from '../../service/createRepetition/request';
import { getRequest } from '../../utils/getRequest';
import { updateRepetitionService } from '../../service/updateService/service';

export const updateRepetition = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const repetitionId: string = <string>event.data.getPathParam('id');
    const body: CreateRepetitionRequest = getRequest(event);
    const result = await updateRepetitionService(repetitionId, body);

    return getResponse(200, result);
  } catch (error) {
    return getErrorResponse(error);
  }
};
