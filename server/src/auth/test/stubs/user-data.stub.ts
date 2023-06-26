import { AuthDataReturn } from 'auth/auth.interface';
import { userDtoStub } from 'users/test/stubs';

export const userDataStub = (): AuthDataReturn => ({
  data: { user: userDtoStub(), accessToken: 'access-token' },
  refreshToken: 'refresh-token',
});
