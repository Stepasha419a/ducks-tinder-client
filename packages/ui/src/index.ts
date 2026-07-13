import {
  APP_AUTH_HOC_COMPOSITION,
  APP_PRIVATE_HOC_COMPOSITION,
  HocCompositionStage,
} from '@ducks-tinder-client/common';
import { WithModals } from '@shared/lib/hocs';

import './app/styles/index.scss';

export * from './shared/ui';
export * from './shared/model';
export * from './shared/lib';

export * from './entities/user';

APP_PRIVATE_HOC_COMPOSITION.addHocs(HocCompositionStage.BOOTSTRAPPING, [
  WithModals,
]);

APP_AUTH_HOC_COMPOSITION.addHocs(HocCompositionStage.BOOTSTRAPPING, [
  WithModals,
]);
