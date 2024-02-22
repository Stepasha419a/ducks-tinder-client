import { instance } from '@shared/api';
import type { AuthResponse } from './auth.interfaces';

export const authService = {
  async refresh() {
    return instance.get<AuthResponse>(
      `${process.env.USER_SERVICE_URL!}/auth/refresh`
    );
  },
  async registration(email: string, name: string, password: string) {
    return instance.post<AuthResponse>(
      `${process.env.USER_SERVICE_URL!}/auth/registration`,
      {
        email,
        name,
        password,
      }
    );
  },
  async login(email: string, password: string) {
    return instance.post<AuthResponse>(
      `${process.env.USER_SERVICE_URL!}/auth/login`,
      { email, password }
    );
  },
  async logout() {
    return instance.patch(`${process.env.USER_SERVICE_URL!}/auth/logout`);
  },
};
