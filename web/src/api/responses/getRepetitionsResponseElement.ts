export interface GetRepetitionsResponseElement {
  id: string;
  userId: string;
  sourceLanguage: string;
  targetLanguage: string;
  sourceLanguageText: string;
  targetLanguageText: string;
  successfulRepetitionsInRow: number;
  nextRepetitionDate: string;
  createdAt: string;
  updatedAt: string;
}
