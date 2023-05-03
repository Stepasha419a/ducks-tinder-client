import type { User } from '../../interfaces';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegistrationParams extends LoginParams {
  name: string;
}
