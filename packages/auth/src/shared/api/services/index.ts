export * from './mock';

export * from './auth/auth.interfaces';

import type { AuthService } from './auth/auth.interfaces';
import { createAuthService } from './auth/auth.service';

interface Instances {
  authService: AuthService | null;
}

const instances: Instances = {
  authService: null,
};

export const getOrCreateService = <T extends Instances[keyof Instances]>(
  key: keyof Instances,
  createService: () => T
): T => {
  if (!instances[key]) {
    instances[key] = createService() as AuthService;
  }

  return instances[key] as T;
};

export const getAuthService = () =>
  getOrCreateService('authService', createAuthService);
