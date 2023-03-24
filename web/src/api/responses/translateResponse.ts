export interface TranslateResponse {
  AppliedSettings: {
    Formality: string;
    Profanity: string;
  };
  AppliedTerminologies: [
    {
      Name: string;
      Terms: [
        {
          SourceText: string;
          TargetText: string;
        },
      ];
    },
  ];
  SourceLanguageCode: string;
  TargetLanguageCode: string;
  TranslatedText: string;
}
