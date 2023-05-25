import { userStub } from 'test/users/stubs';

export const userDataStub = () => ({
  user: userStub(),
  accessToken: 'access-token',
  refreshToken: 'refresh-token',
});
