import {
  APP_AUTH_HOC_COMPOSITION,
  APP_PRIVATE_HOC_COMPOSITION,
  HocCompositionStage,
  WithErrorFallback,
} from '@ducks-tinder-client/common';

import { WithAuthRedirect } from '@features/WithAuthRedirect';
import { WithCheckedFields } from '@features/WithCheckedFields';
import { WithUserData } from '@features/WithUserData';
import { WithInitialLoading, WithPairsInfo } from '@entities/user';
import { setUiLibSettings } from '@ducks-tinder-client/ui';

export { WithBrowserRouter } from './BrowserRouter';
export { withAppHocs } from './withAppHocs';


setUiLibSettings({ IMAGE_BASE_URL: window._env_.VAR_FILE_SERVICE_URL });

APP_PRIVATE_HOC_COMPOSITION.addHocs(HocCompositionStage.BOOTSTRAPPING, [
  WithInitialLoading,
]);
APP_PRIVATE_HOC_COMPOSITION.addHocs(HocCompositionStage.AUTH_CHECK, [
  WithAuthRedirect,
]);
APP_PRIVATE_HOC_COMPOSITION.addHocs(HocCompositionStage.USER_HYDRATION, [
  WithUserData,
]);
APP_PRIVATE_HOC_COMPOSITION.addHocs(HocCompositionStage.DATA_SYNCING, [
  WithPairsInfo,
]);
APP_PRIVATE_HOC_COMPOSITION.addHocs(HocCompositionStage.COMPLETE, [
  WithCheckedFields,
  (Component) => WithErrorFallback(Component, { redirect: true }),
]);

APP_AUTH_HOC_COMPOSITION.addHocs(HocCompositionStage.BOOTSTRAPPING, [
  WithInitialLoading,
]);
APP_AUTH_HOC_COMPOSITION.addHocs(HocCompositionStage.AUTH_CHECK, [
  WithAuthRedirect,
]);
APP_AUTH_HOC_COMPOSITION.addHocs(HocCompositionStage.COMPLETE, [
  (Component) => WithErrorFallback(Component, { redirect: true }),
]);
