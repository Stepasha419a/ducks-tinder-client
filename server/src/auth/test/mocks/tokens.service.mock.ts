import { userStub } from 'users/test/stubs';
import { userDataStub } from '../stubs';

export const TokensServiceMock = jest.fn().mockReturnValue({
  generateTokens: jest.fn().mockResolvedValue({
    refreshToken: userDataStub().refreshToken,
    accessToken: userDataStub().accessToken,
  }),
  removeToken: jest.fn(),
  validateRefreshToken: jest.fn().mockResolvedValue({
    id: userStub().id,
    email: userStub().email,
  }),
});
