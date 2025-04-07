import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  HocComposition,
  ROUTES,
  store,
  useAppSelector,
  WithErrorFallback,
  WithUserData,
} from '@ducks-tinder-client/common';
import { ThemeProvider } from '@ducks-tinder-client/ui';

import ChatPage, { ActiveChat, IndexChatPage } from '@pages/Chat';
import { WithChatConnection } from '@features/WithChatConnection';
import { ChatList, WithNewMessagesCount } from '@entities/chat';

import '@ducks-tinder-client/ui/dist/ui.css';
import styles from './App.module.scss';

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
        <ThemeProvider>
          <WrappedRoutes />
        </ThemeProvider>
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
          <Route path={ROUTES.CHAT} element={<ChatPage />}>
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
