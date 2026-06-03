import {
  APP_AUTH_HOC_COMPOSITION,
  APP_PRIVATE_HOC_COMPOSITION,
  HocCompositionStage,
  instance,
  WithErrorFallback,
  WithTanstackQueryProvider,
} from '@ducks-tinder-client/common';

import { WithCheckedFields } from '@features/WithCheckedFields';
import { WithPairsInfo } from '@entities/user';
import { setUiLibSettings } from '@ducks-tinder-client/ui';

export { WithBrowserRouter } from './BrowserRouter';
export { withAppHocs } from './withAppHocs';
import { setUpInterceptors } from '@ducks-tinder-client/auth';

setUiLibSettings({ IMAGE_BASE_URL: window._env_.VAR_FILE_SERVICE_URL });

setUpInterceptors(instance);

APP_PRIVATE_HOC_COMPOSITION.addHocs(HocCompositionStage.BOOTSTRAPPING, [
  WithTanstackQueryProvider,
]);
APP_PRIVATE_HOC_COMPOSITION.addHocs(HocCompositionStage.DATA_SYNCING, [
  WithPairsInfo,
]);
APP_PRIVATE_HOC_COMPOSITION.addHocs(HocCompositionStage.COMPLETE, [
  WithCheckedFields,
  (Component) => WithErrorFallback(Component, { redirect: true }),
]);

APP_AUTH_HOC_COMPOSITION.addHocs(HocCompositionStage.COMPLETE, [
  (Component) => WithErrorFallback(Component, { redirect: true }),
]);
