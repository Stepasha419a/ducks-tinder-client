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
