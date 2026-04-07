import type { ReactElement } from 'react';

import { ThemeProvider, ToastContainer } from '@ducks-tinder-client/ui';

import { withAppHocs, OptionalMetricsProvider } from './lib';
import { Routing } from './routing';
import '@ducks-tinder-client/ui/dist/esm/index.css';

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
