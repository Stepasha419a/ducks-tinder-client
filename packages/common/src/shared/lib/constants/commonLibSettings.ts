export interface CommonLibSettings {
  CLIENT_ROOT_URL: string;
  AUTH_SERVICE_URL: string;
  CHAT_SERVICE_URL: string;
  CHAT_SERVICE_SOCKET_PATH: string;
  FILE_SERVICE_URL: string;
  USER_SERVICE_URL: string;
  WITH_MOCKS: boolean;
}

export const COMMON_LIB_SETTINGS: CommonLibSettings = {
  CLIENT_ROOT_URL: '',
  AUTH_SERVICE_URL: '',
  CHAT_SERVICE_URL: '',
  CHAT_SERVICE_SOCKET_PATH: '',
  FILE_SERVICE_URL: '',
  USER_SERVICE_URL: '',
  WITH_MOCKS: false,
};
