import { userStub } from 'users/test/stubs';

export const userDataStub = () => ({
  user: userStub(),
  accessToken: 'access-token',
  refreshToken: 'refresh-token',
});
