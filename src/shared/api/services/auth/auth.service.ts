import { instance } from '@shared/api';
import type { AuthResponse } from './auth.interfaces';

export const authService = {
  async refresh() {
    return instance.get<AuthResponse>('auth/refresh');
  },
  async registration(email: string, name: string, password: string) {
    return instance.post<AuthResponse>('auth/registration', {
      email,
      name,
      password,
    });
  },
  async login(email: string, password: string) {
    return instance.post<AuthResponse>('auth/login', { email, password });
  },
  async logout() {
    return instance.patch('auth/logout');
  },
};
