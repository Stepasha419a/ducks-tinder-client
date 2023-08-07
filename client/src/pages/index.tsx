import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '@shared/constants';
import Login from '@pages/Login';
import Registration from '@pages/Registration';
import NavLayout from '@pages/NavLayout';
import TinderPage from '@pages/Tinder';
import ProfilePage from '@pages/Profile';
import ChatPage from '@pages/Chat';
import PairsPage from '@pages/Pairs';
import PolicyPage from '@pages/Policy';
import { ImageSetting, PlaceSetting } from '@widgets';
import { ActiveChat, IndexChatPage } from './Chat/components';
import { ProfilePreview } from './Profile/components';
import NotFound from './NotFound/NotFound';

const Routing = (): ReactElement => {
  return (
    <Routes>
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.registration} element={<Registration />} />

      <Route path={ROUTES.main} element={<NavLayout />}>
        <Route index element={<TinderPage />} />
        <Route path={ROUTES.profile} element={<ProfilePage />}>
          <Route index element={<ProfilePreview />} />
          <Route path="edit" element={<ImageSetting />} />
          <Route path="place" element={<PlaceSetting />} />
          <Route path=":settingName" element={<ProfilePreview />} />
        </Route>
        <Route path={ROUTES.chat} element={<ChatPage />}>
          <Route index element={<IndexChatPage />} />
          <Route path=":chatId" element={<ActiveChat />} />
        </Route>
        <Route path={ROUTES.pairs} element={<PairsPage />} />
      </Route>

      <Route path={ROUTES.policy} element={<PolicyPage />} />
      <Route path={ROUTES.notFound} element={<NotFound />} />
    </Routes>
  );
};

export default Routing;
