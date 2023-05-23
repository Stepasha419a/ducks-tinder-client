import { userStub } from '../../users/stubs';
export const AuthServiceMock = jest.fn().mockReturnValue({
  registration: jest.fn().mockResolvedValue({
    user: userStub(),
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
  }),
  login: jest.fn().mockResolvedValue({
    user: userStub(),
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
  }),
  logout: jest.fn().mockResolvedValue({}),
  refresh: jest.fn().mockResolvedValue({
    user: userStub(),
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
  }),
});
