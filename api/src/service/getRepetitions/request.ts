import { BaseRequest } from '../../utils/interfaces/BaseRequest';
import { Sort } from '../../utils/interfaces/Sort';

export interface GetRepetitionsRequest extends BaseRequest {
  // query parameters
  startDate?: Date;
  endDate?: Date;
  sourceLanguage?: string;
  targetLanguage?: string;
  sort?: Sort;
}
