export {};

declare global {
  interface Window {
    _env_: {
      VITE_USER_SERVICE_URL: string;
      VITE_CHAT_SERVICE_URL: string;
      VITE_FILE_SERVICE_URL: string;
      VITE_AUTH_SERVICE_URL: string;
      VITE_MODE: string;
    };
  }
}
