import type { ReactElement } from 'react';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '@pages/Login';
import NavLayout from '@pages/NavLayout';
import TinderPage from '@pages/Tinder';

import { PlaceSetting, ProfileEdit, ProfilePreview } from '@widgets';
import { ProfileSetting } from '@features/user';
import { ROUTES } from '@shared/constants';
import { WithSuspense } from '@shared/lib/hocs';
import { ActiveChat, IndexChatPage } from './Chat';
import NotFound from './NotFound/NotFound';
import { SettingsIndexPage } from './Settings';

const ChatPage = WithSuspense(lazy(async () => import('@pages/Chat')));
const PairsPage = WithSuspense(lazy(async () => import('@pages/Pairs')));
const PolicyPage = WithSuspense(lazy(async () => import('@pages/Policy')));
const ProfilePage = WithSuspense(lazy(async () => import('@pages/Profile')));
const Registration = WithSuspense(
  lazy(async () => import('@pages/Registration'))
);
const SettingsPage = WithSuspense(lazy(async () => import('@pages/Settings')));

const Routing = (): ReactElement => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTRATION} element={<Registration />} />

      <Route path={ROUTES.MAIN} element={<NavLayout />}>
        <Route index element={<TinderPage />} />
        <Route path={ROUTES.EXPLORE} element={<TinderPage explore />} />
        <Route path={ROUTES.EXPLORE_TAG} element={<TinderPage explore />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />}>
          <Route index element={<ProfilePreview />} />
          <Route path="edit" element={<ProfileEdit />} />
          <Route path="edit/:profileSettingName" element={<ProfileSetting />} />
        </Route>
        <Route path={ROUTES.SETTINGS} element={<SettingsPage />}>
          <Route index element={<SettingsIndexPage />} />
          <Route path="place" element={<PlaceSetting />} />
          <Route path=":settingName" element={<SettingsIndexPage />} />
        </Route>
        <Route path={ROUTES.CHAT} element={<ChatPage />}>
          <Route index element={<IndexChatPage />} />
          <Route path=":chatId" element={<ActiveChat />} />
        </Route>
        <Route path={ROUTES.PAIRS} element={<PairsPage />} />
      </Route>

      <Route path={ROUTES.POLICY} element={<PolicyPage />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};

export default Routing;
