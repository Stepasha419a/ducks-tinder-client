export {};

declare global {
  interface Window {
    _env_: {
      VAR_CLIENT_ROOT_URL: string;
      VAR_USER_SERVICE_URL: string;
      VAR_CHAT_SERVICE_URL: string;
      VAR_CHAT_SERVICE_SOCKET_PATH: string;
      VAR_FILE_SERVICE_URL: string;
      VAR_AUTH_SERVICE_URL: string;
      VAR_MODE: string;
      VAR_ROOT_PATH?: string;
      VAR_MATOMO_URL?: string;
      VAR_MATOMO_SITE_ID?: string;
    };
  }
}
