import { userStub } from '../../users/stubs';

export const userDataStub = () => ({
  user: userStub(),
  accessToken: 'access-token',
  refreshToken: 'refresh-token',
});
