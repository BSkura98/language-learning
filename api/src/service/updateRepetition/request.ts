import { BaseRequest } from '../../utils/interfaces/BaseRequest';

export enum RepetitionResult {
  success = 'success',
  partialSuccess = 'partialSuccess',
  failure = 'failure'
}

export interface UpdateRepetitionRequest extends BaseRequest {
  // path parameters
  id: string;
  // body
  sourceLanguageText?: string;
  targetLanguageText?: string;
  nextRepetitionDate?: Date;
  repetitionResult?: RepetitionResult;
}
