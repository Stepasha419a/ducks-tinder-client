import type { AxiosResponse } from 'axios';
import { instance } from '@shared/api';
import type { AuthResponse } from '@shared/api/interfaces';

export interface UserAuthParams {
  email: string;
  name?: string;
  password: string;
}

export const authAPI = {
  async registration(
    email: string,
    name: string | undefined,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return instance.post('auth/registration', { email, name, password });
  },
  async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return instance.post('auth/login', { email, password });
  },
  async logout(): Promise<void> {
    return instance.post('auth/logout');
  },
};
