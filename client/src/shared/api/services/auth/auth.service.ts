import { instance } from '@shared/api';
import type { User } from '../../interfaces';

export const authService = {
  async registration(email: string, name: string, password: string) {
    return instance.post<User>('auth/registration', {
      email,
      name,
      password,
    });
  },
  async login(email: string, password: string) {
    return instance.post<User>('auth/login', { email, password });
  },
  async logout() {
    return instance.patch('auth/logout');
  },
};
