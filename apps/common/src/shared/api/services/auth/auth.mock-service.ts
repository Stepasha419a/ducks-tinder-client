/* eslint-disable @typescript-eslint/no-unused-vars */

import type { AxiosResponse } from 'axios';
import type { AuthResponse, AuthService } from '@shared/api';
import {
  deleteTestUser,
  getTestUser,
  mockStorage,
  rejectWithAxiosResponseError,
  resolveAxiosResponse,
  saveTestUser,
  authResponseStub,
} from '@shared/api';

export const authMockService: AuthService = {
  async registration(email, name, password) {
    mockStorage.currentUser = { ...mockStorage.currentUser, name };
    saveTestUser(mockStorage.currentUser);

    return resolveAxiosResponse({
      ...authResponseStub,
      ...mockStorage.currentUser,
    });
  },
  async login(email, password) {
    saveTestUser(mockStorage.currentUser);

    return resolveAxiosResponse({
      ...authResponseStub,
      ...mockStorage.currentUser,
    });
  },
  async refresh() {
    const savedUser = getTestUser();
    if (!savedUser) {
      return rejectWithAxiosResponseError(
        401
      ) as unknown as AxiosResponse<AuthResponse>;
    }

    mockStorage.currentUser = savedUser;
    return resolveAxiosResponse({ ...authResponseStub, ...savedUser });
  },
  async logout() {
    deleteTestUser();
    return resolveAxiosResponse();
  },
};
