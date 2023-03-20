import * as AWS from 'aws-sdk';
import { APIGatewayProxyResult } from 'aws-lambda';

import { GetSupportedLanguagesQueryParameters } from './queryParameters';

export const getSupportedLanguagesService = async (
  queryParameters: GetSupportedLanguagesQueryParameters
): Promise<APIGatewayProxyResult> => {
  AWS.config.apiVersions = {
    translate: '2017-07-01'
  };
  const translate = new AWS.Translate();
  const params = {
    DisplayLanguageCode: queryParameters.displayLanguageCode
  };

  return await translate.listLanguages(params).promise();
};
