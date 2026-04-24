import type { ReactElement } from 'react';

import { ThemeProvider, ToastContainer } from '@ducks-tinder-client/ui';

import { withAppHocs, OptionalMetricsProvider } from './lib';
import { Routing } from './routing';
import '@ducks-tinder-client/ui/dist/esm/index.css';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const MFE_URLS: Record<string, string> = {
  policy: window._env_.VAR_POLICY_MFE_URL,
  chat: window._env_.VAR_CHAT_MFE_URL,
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    load: 'languageOnly',
    backend: {
      loadPath: (lngs: string[], namespaces: string[]) => {
        const ns = namespaces[0];
        const baseUrl = MFE_URLS[ns] || '';
        return `${baseUrl}/locales/${lngs[0]}/${ns}.json`;
      },
    },
    ns: ['common'],
    defaultNS: 'common',
  });
// TODO: decompose ThemeProvider into hoc
function App(): ReactElement {
  return (
    <ThemeProvider>
      <Routing />
      <OptionalMetricsProvider />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default withAppHocs(App);
