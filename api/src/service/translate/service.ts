import * as AWS from "aws-sdk";
import { APIGatewayProxyResult } from "aws-lambda";

import { TranslateRequest } from "./request";
import { validate } from "./validator";

export const translateService = async (
  requestParameters: TranslateRequest
): Promise<APIGatewayProxyResult> => {
  AWS.config.apiVersions = {
    translate: '2017-07-01',
  };
  validate(requestParameters);

  const translate = new AWS.Translate();
  const params = {
    SourceLanguageCode: requestParameters.sourceLanguageCode,
    TargetLanguageCode: requestParameters.targetLanguageCode,
    Text: requestParameters.text,
  };

  return await translate.translateText(params).promise();
};
