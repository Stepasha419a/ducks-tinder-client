export enum SupportedLanguage {
  English = 'en',
  Russian = 'ru',
}

export const LANGUAGE_TRANSCRIPTION: Record<SupportedLanguage, string> = {
  [SupportedLanguage.English]: 'English',
  [SupportedLanguage.Russian]: 'Русский',
};
