import { instance } from '@shared/api';
import type { AuthResponse, AuthService } from './auth.interfaces';
import { authMockService } from '../mock/auth/auth.mock-service';
import { getMockableService } from '../mock/mock';

export const authService: AuthService = getMockableService(
  {
    async refresh() {
      return instance.get<AuthResponse>(
        `${import.meta.env.VITE_USER_SERVICE_URL}/auth/refresh`
      );
    },
    async registration(email: string, name: string, password: string) {
      return instance.post<AuthResponse>(
        `${import.meta.env.VITE_USER_SERVICE_URL}/auth/registration`,
        {
          email,
          name,
          password,
        }
      );
    },
    async login(email: string, password: string) {
      return instance.post<AuthResponse>(
        `${import.meta.env.VITE_USER_SERVICE_URL}/auth/login`,
        { email, password }
      );
    },
    async logout() {
      return instance.patch(
        `${import.meta.env.VITE_USER_SERVICE_URL}/auth/logout`
      );
    },
  },
  authMockService
);
