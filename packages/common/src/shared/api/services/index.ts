export * from './helper';

export * from './mock';

export * from './chat/chat-service.interface';
export * from './user/user-service.interface';
export * from './auth/auth.interfaces';

import type { AuthService } from './auth/auth.interfaces';
import { createAuthService } from './auth/auth.service';
import type { ChatService } from './chat/chat-service.interface';
import { createChatService } from './chat/chat.service';
import type { UserService } from './user/user-service.interface';
import { createUserService } from './user/user.service';

interface Instances {
  authService: AuthService | null;
  chatService: ChatService | null;
  userService: UserService | null;
}

const instances: Instances = {
  authService: null,
  chatService: null,
  userService: null,
};

const getOrCreateService = <T extends Instances[keyof Instances]>(
  key: keyof Instances,
  createService: () => T
): T => {
  if (!instances[key]) {
    instances[key] = createService() as AuthService & ChatService & UserService;
  }

  return instances[key] as T;
};

export const serviceGetter = {
  getAuthService: () => getOrCreateService('authService', createAuthService),
  getChatService: () => getOrCreateService('chatService', createChatService),
  getUserService: () => getOrCreateService('userService', createUserService),
};
