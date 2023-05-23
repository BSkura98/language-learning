export interface CreateRepetitionRequest {
  id: string;
  userId: string;
  sourceLanguage: string;
  targetLanguage: string;
  sourceLanguageText: string;
  targetLanguageText: string;
  successfulRepetitionsInRow: number;
  nextRepetitionDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
