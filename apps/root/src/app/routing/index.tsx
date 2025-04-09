import type { ReactElement } from 'react';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ROUTES, WithSuspense } from '@ducks-tinder-client/common';
import { LoadingPage } from '@ducks-tinder-client/ui';

import Login from '@pages/Login';
import NavLayout from '@pages/NavLayout';
import NotFound from '@pages/NotFound';
import { SettingsIndexPage } from '@pages/Settings';
import TinderPage from '@pages/Tinder';
import { PlaceSetting } from '@widgets/PlaceSetting';
import { ProfileEdit } from '@widgets/ProfileEdit';
import { ProfilePreview } from '@widgets/ProfilePreview';
import { ProfileSetting } from '@features/ProfileSetting';

const defaultFallbackSuspense = (Component: React.ComponentType) =>
  WithSuspense(Component, <LoadingPage />);

const ChatPage = defaultFallbackSuspense(
  lazy(async () => import('@pages/Chat'))
);
const PairsPage = defaultFallbackSuspense(
  lazy(async () => import('@pages/Pairs'))
);
const PolicyPage = defaultFallbackSuspense(
  lazy(async () => import('@pages/Policy'))
);
const ProfilePage = defaultFallbackSuspense(
  lazy(async () => import('@pages/Profile'))
);
const Registration = defaultFallbackSuspense(
  lazy(async () => import('@pages/Registration'))
);
const SettingsPage = defaultFallbackSuspense(
  lazy(async () => import('@pages/Settings'))
);

export const Routing = (): ReactElement => {
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

      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      <Route path={ROUTES.POLICY} element={<PolicyPage />} />
    </Routes>
  );
};
