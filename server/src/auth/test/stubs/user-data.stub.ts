import { userDtoStub } from 'users/test/stubs';

export const userDataStub = () => ({
  user: userDtoStub(),
  accessToken: 'access-token',
  refreshToken: 'refresh-token',
});
