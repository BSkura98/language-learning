import { BaseRequest } from '../../utils/BaseRequest';

export enum RepetitionResult {
  success = 'success',
  partialSuccess = 'partialSuccess',
  failure = 'failure'
}

export interface UpdateRepetitionRequest extends BaseRequest {
  sourceLanguageText?: string;
  targetLanguageText?: string;
  nextRepetitionDate?: Date;
  repetitionResult?: RepetitionResult;
}
