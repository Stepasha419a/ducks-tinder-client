import { instance } from '@shared/api';
import { authMockService } from '@shared/api';
import { getMockableService } from '@shared/api';
import type { AuthResponse, AuthService } from './auth.interfaces';

export const authService: AuthService = getMockableService(
  {
    async refresh() {
      return instance.get<AuthResponse>(
        `${import.meta.env.VITE_AUTH_SERVICE_URL}/auth/refresh`
      );
    },
    async registration(email: string, name: string, password: string) {
      return instance.post<AuthResponse>(
        `${import.meta.env.VITE_AUTH_SERVICE_URL}/auth/register`,
        {
          email,
          name,
          password,
        }
      );
    },
    async login(email: string, password: string) {
      return instance.post<AuthResponse>(
        `${import.meta.env.VITE_AUTH_SERVICE_URL}/auth/login`,
        { email, password }
      );
    },
    async logout() {
      return instance.patch(
        `${import.meta.env.VITE_AUTH_SERVICE_URL}/auth/logout`
      );
    },
  },
  authMockService
);
