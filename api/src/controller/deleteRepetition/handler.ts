import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { getErrorResponse } from '../../utils/getErrorResponse';
import { getResponse } from '../../utils/getResponse';
import { getRequest } from '../../utils/getRequest';
import { deleteRepetitionService } from '../../service/deleteRepetition/service';
import { DeleteRepetitionRequest } from '../../service/deleteRepetition/request';

export const deleteRepetition = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const body: DeleteRepetitionRequest = { ...getRequest(event), id: event.data.getPathParam('id') };
    await deleteRepetitionService(body);

    return getResponse(204);
  } catch (error) {
    return getErrorResponse(error);
  }
};
