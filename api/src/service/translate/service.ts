import * as AWS from "aws-sdk";
import { APIGatewayProxyResult } from "aws-lambda";

import { TranslateRequest } from "./request";
import { validate } from "./validator";

export const translateService = async (
  body: TranslateRequest
): Promise<APIGatewayProxyResult> => {
  AWS.config.apiVersions = {
    translate: '2017-07-01',
  };
  validate(body);

  const translate = new AWS.Translate();
  const params = {
    SourceLanguageCode: body.sourceLanguageCode,
    TargetLanguageCode: body.targetLanguageCode,
    Text: body.text,
  };

  return await translate.translateText(params).promise();
};
