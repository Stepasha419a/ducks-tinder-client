import type { User } from '@ducks-tinder-client/common';
import {
  APP_AUTH_HOC_COMPOSITION,
  APP_PRIVATE_HOC_COMPOSITION,
  globalEventEmitter,
  HocCompositionStage,
} from '@ducks-tinder-client/common';
import {
  WithAuthRedirect,
  WithInitialLoading,
  WithUserData,
} from '@entities/user/lib';
import { useUserStore } from '@entities/user/model';

export * from './entities/user';
export * from './shared/api';

export * from './features/LoginForm';
export * from './features/RegistrationForm';

APP_PRIVATE_HOC_COMPOSITION.addHocs(HocCompositionStage.BOOTSTRAPPING, [
  WithInitialLoading,
]);
APP_PRIVATE_HOC_COMPOSITION.addHocs(HocCompositionStage.AUTH_CHECK, [
  WithAuthRedirect,
]);
APP_PRIVATE_HOC_COMPOSITION.addHocs(HocCompositionStage.USER_HYDRATION, [
  WithUserData,
]);

APP_AUTH_HOC_COMPOSITION.addHocs(HocCompositionStage.BOOTSTRAPPING, [
  WithInitialLoading,
]);
APP_AUTH_HOC_COMPOSITION.addHocs(HocCompositionStage.AUTH_CHECK, [
  WithAuthRedirect,
]);

globalEventEmitter.on('set-user', (user: User) => {
  // TODO: remove on redux from common-package remove, this should be called inside root-app on redux thunk-action, not auth-package
  useUserStore.getState().setCurrentUser(user);
});
