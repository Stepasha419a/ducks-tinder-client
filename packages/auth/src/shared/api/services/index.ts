export * from './mock';

export * from './auth/auth.interfaces';

import type { AuthService } from './auth/auth.interfaces';
import { createAuthService } from './auth/auth.service';
import { createUserGetMeEndpoint } from './user/endpoints';
import type { UserGetMeEndpoint } from './user/user.interfaces';

interface Instances {
  authService: AuthService | null;
  userGetMeEndpoint: UserGetMeEndpoint | null;
}

const instances: Instances = {
  authService: null,
  userGetMeEndpoint: null,
};

export const getOrCreateService = <T extends Instances[keyof Instances]>(
  key: keyof Instances,
  createService: () => T
): T => {
  if (!instances[key]) {
    instances[key] = createService() as AuthService & UserGetMeEndpoint;
  }

  return instances[key] as T;
};

export const getAuthService = () =>
  getOrCreateService('authService', createAuthService);

export const getUserGetMeEndpoint = () =>
  getOrCreateService('userGetMeEndpoint', createUserGetMeEndpoint);
