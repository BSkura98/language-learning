import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { getErrorResponse } from '../../utils/getErrorResponse';
import { getSupportedLanguagesService } from '../../service/getSupportedLanguages/service';
import { GetSupportedLanguagesQueryParameters } from '../../service/getSupportedLanguages/queryParameters';
import { getResponse } from '../../utils/getResponse';

export const getSupportedLanguages = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const queryParameters: GetSupportedLanguagesQueryParameters = {
      displayLanguageCode: event.queryStringParameters?.displayLanguageCode
    };
    const result = await getSupportedLanguagesService(queryParameters);

    return getResponse(200, result);
  } catch (error) {
    return getErrorResponse(error);
  }
};
