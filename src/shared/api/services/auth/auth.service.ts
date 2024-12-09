import { instance } from '@shared/api';
import { getMockableService } from '../mock';
import type { AuthResponse, AuthService } from './auth.interfaces';
import { authMockService } from './auth.mock-service';

export const authService: AuthService = getMockableService(
  {
    async refresh() {
      return instance.get<AuthResponse>(
        `${process.env.VITE_AUTH_SERVICE_URL}/auth/refresh`
      );
    },
    async registration(email: string, name: string, password: string) {
      return instance.post<AuthResponse>(
        `${process.env.VITE_AUTH_SERVICE_URL}/auth/register`,
        {
          email,
          name,
          password,
        }
      );
    },
    async login(email: string, password: string) {
      return instance.post<AuthResponse>(
        `${process.env.VITE_AUTH_SERVICE_URL}/auth/login`,
        { email, password }
      );
    },
    async logout() {
      return instance.patch(`${process.env.VITE_AUTH_SERVICE_URL}/auth/logout`);
    },
  },
  authMockService
);
