/* eslint-disable @typescript-eslint/no-unused-vars */

import type { AuthResponse, AuthService } from '@shared/api/services';
import { mockStorage, resolveAxiosResponse } from '../mock';
import { authResponseStub } from './auth.stub';

export const authMockService: AuthService = {
  async registration(email, name, password) {
    mockStorage.currentUser = { ...mockStorage.currentUser, email, name };
    return resolveAxiosResponse({
      ...authResponseStub,
      ...mockStorage.currentUser,
    });
  },
  async login(email, password) {
    mockStorage.currentUser = { ...mockStorage.currentUser, email };
    return resolveAxiosResponse({
      ...authResponseStub,
      ...mockStorage.currentUser,
    });
  },
  async refresh() {
    return resolveAxiosResponse({} as AuthResponse);
  },
  async logout() {
    return resolveAxiosResponse();
  },
};
