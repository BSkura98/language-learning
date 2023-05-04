import { BaseRequest } from "../../utils/interfaces/BaseRequest";

export interface CreateRepetitionRequest extends BaseRequest {
  // body
  sourceLanguage: string;
  targetLanguage: string;
  sourceLanguageText: string;
  targetLanguageText: string;
}
