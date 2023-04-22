import { BaseRequest } from "../../utils/BaseRequest";

export interface CreateRepetitionRequest extends BaseRequest {
  sourceLanguage: string;
  targetLanguage: string;
  sourceLanguageText: string;
  targetLanguageText: string;
}
