import { AxiosResponse } from 'axios';
import { AuthResponse } from '../../models/response/AuthResponse';
import { instance } from '../api';

export type UserAuthParams = {
  email: string;
  name?: string;
  password: string;
};

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
