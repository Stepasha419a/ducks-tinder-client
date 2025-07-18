import { instance } from '@shared/api';

import { getMockableService } from '../mock';
import type { AuthResponse, AuthService } from './auth.interfaces';
import { authMockService } from './auth.mock-service';
import { LIB_SETTINGS } from '@shared/lib';

export const authService: AuthService = getMockableService(
  {
    async refresh() {
      return instance.get<AuthResponse>(
        `${LIB_SETTINGS.AUTH_SERVICE_URL}/auth/refresh`
      );
    },
    async registration(email: string, name: string, password: string) {
      return instance.post<AuthResponse>(
        `${LIB_SETTINGS.AUTH_SERVICE_URL}/auth/register`,
        {
          email,
          name,
          password,
        }
      );
    },
    async login(email: string, password: string) {
      return instance.post<AuthResponse>(
        `${LIB_SETTINGS.AUTH_SERVICE_URL}/auth/login`,
        { email, password }
      );
    },
    async logout() {
      return instance.patch(`${LIB_SETTINGS.AUTH_SERVICE_URL}/auth/logout`);
    },
  },
  authMockService
);
