export * from './helper';

export * from './mock';

export * from './user/user-service.interface';

import type { UserService } from './user/user-service.interface';
import { createUserService } from './user/user.service';

interface Instances {
  userService: UserService | null;
}

const instances: Instances = {
  userService: null,
};

export const getOrCreateService = <T extends Instances[keyof Instances]>(
  key: keyof Instances,
  createService: () => T
): T => {
  if (!instances[key]) {
    instances[key] = createService() as UserService;
  }

  return instances[key] as T;
};

export const serviceGetter = {
  getUserService: () => getOrCreateService('userService', createUserService),
};
