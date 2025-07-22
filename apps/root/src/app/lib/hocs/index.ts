import {
  setCommonLibSettings,
  WithChatConnection,
  WithErrorFallback,
  WithNewMessagesCount,
} from '@ducks-tinder-client/common';

import { WithAuthRedirect } from '@features/WithAuthRedirect';
import { WithCheckedFields } from '@features/WithCheckedFields';
import { WithUserData } from '@features/WithUserData';
import { WithInitialLoading, WithPairsInfo } from '@entities/user';
import { authHocComposition, privateHocComposition } from '@shared/lib';
import { setUiLibSettings } from '@ducks-tinder-client/ui';

export { WithBrowserRouter } from './BrowserRouter';
export { withAppHocs } from './withAppHocs';

setUiLibSettings({ IMAGE_BASE_URL: window._env_.VITE_FILE_SERVICE_URL });
setCommonLibSettings({
  AUTH_SERVICE_URL: window._env_.VITE_AUTH_SERVICE_URL,
  CHAT_SERVICE_URL: window._env_.VITE_CHAT_SERVICE_URL,
  FILE_SERVICE_URL: window._env_.VITE_FILE_SERVICE_URL,
  USER_SERVICE_URL: window._env_.VITE_USER_SERVICE_URL,
  WITH_MOCKS: window._env_.VITE_MODE === 'demo',
});

privateHocComposition.addHocs([
  WithInitialLoading,
  WithAuthRedirect,
  WithUserData,
  WithCheckedFields,
  WithPairsInfo,
  WithChatConnection,
  WithNewMessagesCount,
  (Component) => WithErrorFallback(Component, { redirect: true }),
]);

authHocComposition.addHocs([
  WithInitialLoading,
  WithAuthRedirect,
  (Component) => WithErrorFallback(Component, { redirect: true }),
]);
