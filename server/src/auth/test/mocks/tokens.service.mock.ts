export const TokensServiceMock = jest.fn().mockReturnValue({
  generateTokens: jest.fn(),
  removeToken: jest.fn(),
  validateRefreshToken: jest.fn(),
});
