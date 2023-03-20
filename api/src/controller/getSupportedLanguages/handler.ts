import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { getErrorResponse } from '../../utils/getErrorResponse';
import { getSupportedLanguagesService } from '../../service/getSupportedLanguages/service';
import { GetSupportedLanguagesQueryParameters } from '../../service/getSupportedLanguages/queryParameters';

export const getSupportedLanguages = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const queryParameters: GetSupportedLanguagesQueryParameters = {
      displayLanguageCode: event.queryStringParameters?.displayLanguageCode
    };
    const result = await getSupportedLanguagesService(queryParameters);

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    return getErrorResponse(error);
  }
};
