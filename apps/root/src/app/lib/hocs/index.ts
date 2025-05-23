import {
  WithChatConnection,
  WithErrorFallback,
  WithNewMessagesCount,
} from '@ducks-tinder-client/common';

import { WithAuthRedirect } from '@features/WithAuthRedirect';
import { WithCheckedFields } from '@features/WithCheckedFields';
import { WithUserData } from '@features/WithUserData';
import { WithInitialLoading, WithPairsInfo } from '@entities/user';
import { authHocComposition, privateHocComposition } from '@shared/lib';

export { WithBrowserRouter } from './BrowserRouter';
export { withAppHocs } from './withAppHocs';

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
