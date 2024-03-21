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
import SettingsPage from '@pages/Settings';
import { PlaceSetting, ProfilePreview } from '@widgets';
import { ActiveChat, IndexChatPage } from './Chat/components';
import NotFound from './NotFound/NotFound';
import { SettingsIndexPage } from './Settings/components';
import { ProfileEdit } from './Profile/components';
import { ProfileSetting } from '@features/user/ProfileSetting/ProfileSetting';

const Routing = (): ReactElement => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTRATION} element={<Registration />} />

      <Route path={ROUTES.MAIN} element={<NavLayout />}>
        <Route index element={<TinderPage />} />
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
