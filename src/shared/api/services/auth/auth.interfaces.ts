import type { AxiosResponse } from 'axios';
import type { User } from '../../interfaces';

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegistrationParams extends LoginParams {
  name: string;
}

export interface AuthResponse extends User {
  accessToken: {
    value: string;
  };
}

export interface AuthService {
  refresh(): Promise<AxiosResponse<AuthResponse>>;
  registration(
    email: string,
    name: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>>;
  login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>;
  logout(): Promise<AxiosResponse<void>>;
}
