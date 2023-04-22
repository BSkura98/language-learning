import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { translateService } from '../../service/translate/service';
import { TranslateRequest } from '../../service/translate/request';
import { getErrorResponse } from '../../utils/getErrorResponse';
import { getResponse } from '../../utils/getResponse';
import { getRequest } from '../../utils/getRequestBody';

export const translate = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const body: TranslateRequest = getRequest(event);
    const result = await translateService(body);

    return getResponse(200, result);
  } catch (error) {
    return getErrorResponse(error);
  }
};
