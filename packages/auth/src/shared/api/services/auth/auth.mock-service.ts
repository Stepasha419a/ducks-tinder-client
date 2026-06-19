/* eslint-disable @typescript-eslint/no-unused-vars */

import type { AxiosResponse } from 'axios';

import type { AuthResponse, AuthService } from '@shared/api';
import {
  authMockStorage,
  authResponseStub,
  deleteTestUser,
  getTestUser,
  saveTestUser,
} from '@shared/api';
import {
  rejectWithAxiosResponseError,
  resolveAxiosResponse,
} from '@ducks-tinder-client/common';

export const authMockService: AuthService = {
  async registration(email, name, password) {
    authMockStorage.currentUser = { ...authMockStorage.currentUser, name };
    saveTestUser(authMockStorage.currentUser);

    return resolveAxiosResponse({
      ...authResponseStub,
      ...authMockStorage.currentUser,
    });
  },
  async login(email, password) {
    saveTestUser(authMockStorage.currentUser);

    return resolveAxiosResponse({
      ...authResponseStub,
      ...authMockStorage.currentUser,
    });
  },
  async refresh() {
    const savedUser = getTestUser();
    if (!savedUser) {
      return rejectWithAxiosResponseError(
        401
      ) as unknown as AxiosResponse<AuthResponse>;
    }

    authMockStorage.currentUser = savedUser;
    return resolveAxiosResponse({ ...authResponseStub, ...savedUser });
  },
  async logout() {
    deleteTestUser();
    return resolveAxiosResponse();
  },
};
