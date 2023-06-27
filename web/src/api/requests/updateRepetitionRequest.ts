export enum RepetitionResult {
  success = 'success',
  partialSuccess = 'partialSuccess',
  failure = 'failure',
}

export interface UpdateRepetitionRequest {
  id: string;
  sourceLanguageText?: string;
  targetLanguageText?: string;
  nextRepetitionDate?: string;
  repetitionResult?: RepetitionResult;
}
