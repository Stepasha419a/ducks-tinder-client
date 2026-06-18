import type { User } from '@ducks-tinder-client/common';
import {
  COMMON_LIB_SETTINGS,
  getMockableService,
  instance,
  resolveAxiosResponse,
} from '@ducks-tinder-client/common';
import type { UserGetMeEndpoint } from './user.interfaces';
import { authMockStorage } from '../mock';

export const createUserGetMeEndpoint = (): UserGetMeEndpoint =>
  getMockableService<UserGetMeEndpoint>(
    async () =>
      instance.get<User>(`${COMMON_LIB_SETTINGS.USER_SERVICE_URL}/user/me`),
    async () => resolveAxiosResponse<User>(authMockStorage.currentUser)
  );
