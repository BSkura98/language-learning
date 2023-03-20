import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { translateService } from "../../service/translate/service";
import { TranslateRequest } from "../../service/translate/request";
import { getErrorResponse } from "../../utils/getErrorResponse";

export const translate = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const body: TranslateRequest = JSON.parse(event.body);
    const result = await translateService(body);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return getErrorResponse(error);
  }
};