import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { getErrorResponse } from '../../utils/getErrorResponse';
import { getResponse } from '../../utils/getResponse';
import { getRequest } from '../../utils/getRequest';
import { GetRepetitionsRequest } from '../../service/getRepetitions/request';
import { getRepetitionsService } from '../../service/getRepetitions/service';

export const getRepetitions = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const requestParameters: GetRepetitionsRequest = getRequest(event, {
      queryParameters: ['startDate', 'endDate', 'sourceLanguage', 'targetLanguage', 'sort']
    });

    await getRepetitionsService(requestParameters);

    return getResponse(200);
  } catch (error) {
    return getErrorResponse(error);
  }
};
