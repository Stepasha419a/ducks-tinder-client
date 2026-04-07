import type { ReactElement } from 'react';

import { ThemeProvider, ToastContainer } from '@ducks-tinder-client/ui';

import { withAppHocs, OptionalMetricsProvider } from './lib';
import { Routing } from './routing';
import '@ducks-tinder-client/ui/dist/esm/index.css';
const MFE_URLS: Record<string, string> = {
  policy: 'http://localhost:3002',
  chat: 'http://localhost:3003',
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
