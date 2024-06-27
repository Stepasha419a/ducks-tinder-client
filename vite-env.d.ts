/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USER_SERVICE_URL: string;
  readonly VITE_CHAT_SERVICE_URL: string;
  readonly VITE_MODE: 'demo' | 'dev';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
