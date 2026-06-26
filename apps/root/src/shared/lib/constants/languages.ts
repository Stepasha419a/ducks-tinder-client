export enum SupportedLanguage {
  English = 'en',
  Russian = 'ru',
  German = 'de',
}

export const LANGUAGE_TRANSCRIPTION: Record<SupportedLanguage, string> = {
  [SupportedLanguage.English]: 'English',
  [SupportedLanguage.Russian]: 'Русский',
  [SupportedLanguage.German]: 'Deutsch',
};
