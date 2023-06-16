import { userStub } from 'users/test/stubs';

export const ResponseMock = jest.fn().mockReturnValue({
  cookie: jest.fn(),
  clearCookie: jest.fn(),
  json: jest.fn().mockResolvedValue(userStub()),
  end: jest.fn(),
});
