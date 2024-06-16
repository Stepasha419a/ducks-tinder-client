/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  userStub,
  type AuthResponse,
  type AuthService,
} from '@shared/api/services';
import {
  deleteTestUser,
  getTestUser,
  mockStorage,
  resolveAxiosResponse,
  saveTestUser,
} from '../mock';
import { authResponseStub } from './auth.stub';

export const authMockService: AuthService = {
  async registration(email, name, password) {
    mockStorage.currentUser = { ...mockStorage.currentUser, email, name };
    saveTestUser(mockStorage.currentUser);

    return resolveAxiosResponse({
      ...authResponseStub,
      ...mockStorage.currentUser,
    });
  },
  async login(email, password) {
    mockStorage.currentUser = { ...mockStorage.currentUser, email };
    saveTestUser(mockStorage.currentUser);

    return resolveAxiosResponse({
      ...authResponseStub,
      ...mockStorage.currentUser,
    });
  },
  async refresh() {
    const savedUser = getTestUser();
    if (!savedUser) {
      return resolveAxiosResponse({} as AuthResponse);
    }

    mockStorage.currentUser = savedUser;
    return resolveAxiosResponse({ ...authResponseStub, ...savedUser });
  },
  async logout() {
    deleteTestUser();
    return resolveAxiosResponse();
  },
};
