export interface CommonLibSettings {
  AUTH_SERVICE_URL: string;
  CHAT_SERVICE_URL: string;
  FILE_SERVICE_URL: string;
  USER_SERVICE_URL: string;
  WITH_MOCKS: boolean;
}

export const COMMON_LIB_SETTINGS: CommonLibSettings = {
  AUTH_SERVICE_URL: '',
  CHAT_SERVICE_URL: '',
  FILE_SERVICE_URL: '',
  USER_SERVICE_URL: '',
  WITH_MOCKS: false,
};
