import { BaseRequest } from '../../utils/interfaces/BaseRequest';

export interface GetRepetitionsRequest extends BaseRequest {
  // query parameters
  startDate?: Date;
  endDate?: Date;
  sourceLanguage?: string;
  targetLanguage?: string;
}
