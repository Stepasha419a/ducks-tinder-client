export interface LoginParams {
  email: string;
  password: string;
}

export interface RegistrationParams extends LoginParams {
  name: string;
}
