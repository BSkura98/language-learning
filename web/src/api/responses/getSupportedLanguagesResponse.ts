interface Language {
  LanguageCode: string;
  LanguageName: string;
}

export interface GetSupportedLanguagesResponse {
  DisplayLanguageCode: string;
  Languages: Language[];
  NextToken: string;
}
