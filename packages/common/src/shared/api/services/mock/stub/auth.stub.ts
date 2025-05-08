import type { AuthResponse } from '@shared/api';

export const authResponseStub: AuthResponse = {
  email: 'email@gmail.com',
  accessToken: 'token',
  id: 'id',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
