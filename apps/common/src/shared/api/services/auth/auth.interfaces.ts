import type { AxiosResponse } from 'axios';

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegistrationParams extends LoginParams {
  name: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  accessToken: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthService {
  refresh(): Promise<AxiosResponse<AuthResponse>>;
  registration(
    email: string,
    name: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>>;
  login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>;
  logout(): Promise<AxiosResponse<boolean>>;
}
