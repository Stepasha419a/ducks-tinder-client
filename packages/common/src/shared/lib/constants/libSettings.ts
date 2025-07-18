export interface LibSettings {
  AUTH_SERVICE_URL: string;
  CHAT_SERVICE_URL: string;
  FILE_SERVICE_URL: string;
  USER_SERVICE_URL: string;
  WITH_MOCKS: boolean;
}

export const LIB_SETTINGS: LibSettings = {
  AUTH_SERVICE_URL: '',
  CHAT_SERVICE_URL: '',
  FILE_SERVICE_URL: '',
  USER_SERVICE_URL: '',
  WITH_MOCKS: false,
};
