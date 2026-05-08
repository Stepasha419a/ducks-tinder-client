import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  HocComposition,
  ROUTES,
  store,
  useAppSelector,
  WithChatConnection,
  WithErrorFallback,
  WithNewMessagesCount,
  WithUserData,
} from '@ducks-tinder-client/common';
import { setUiLibSettings, ThemeProvider } from '@ducks-tinder-client/ui';

import { ActiveChat } from '@pages/ActiveChat';
import { IndexChatPage } from '@pages/IndexChatPage';
import { ChatList } from '@entities/chat';

import '@ducks-tinder-client/ui/dist/esm/index.css';
import * as styles from './App.module.scss';
import { LibLocaleProvider } from './lib/providers';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

setUiLibSettings({ IMAGE_BASE_URL: window._env_.VAR_FILE_SERVICE_URL });

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
    ns: ['chat'],
    defaultNS: 'chat',
  });

const privateHocComposition = new HocComposition();

privateHocComposition.addHocs([
  WithUserData,
  WithChatConnection,
  WithNewMessagesCount,
  (Component) => WithErrorFallback(Component, { redirect: true }),
]);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <LibLocaleProvider>
          <ThemeProvider>
            <WrappedRoutes />
          </ThemeProvider>
        </LibLocaleProvider>
      </BrowserRouter>
    </Provider>
  );
};

const WrappedRoutes = privateHocComposition.appendHocs(() => {
  const userId = useAppSelector((state) => state.user.currentUser?.id);

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {userId ? <ChatList currentUserId={userId} /> : <span>...loading</span>}
      </div>
      <div className={styles.messages}>
        <Routes>
          <Route path={ROUTES.CHAT}>
            <Route index element={<IndexChatPage />} />
            <Route path=":chatId" element={<ActiveChat />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
