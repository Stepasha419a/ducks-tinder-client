export enum SupportedLanguage {
  English = 'en',
  Russian = 'ru',
  German = 'de',
  Chinese = 'zh',
}

export const LANGUAGE_TRANSCRIPTION: Record<SupportedLanguage, string> = {
  [SupportedLanguage.English]: 'English',
  [SupportedLanguage.Russian]: 'Русский',
  [SupportedLanguage.German]: 'Deutsch',
  [SupportedLanguage.Chinese]: '中文',
};
