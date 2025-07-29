export {};

declare global {
  interface Window {
    _env_: {
      VAR_USER_SERVICE_URL: string;
      VAR_CHAT_SERVICE_URL: string;
      VAR_FILE_SERVICE_URL: string;
      VAR_AUTH_SERVICE_URL: string;
      VAR_MODE: string;
    };
  }
}
