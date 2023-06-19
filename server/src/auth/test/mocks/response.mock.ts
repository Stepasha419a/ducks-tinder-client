export const ResponseMock = jest.fn().mockReturnValue({
  cookie: jest.fn(),
  clearCookie: jest.fn(),
  json: jest.fn(),
  end: jest.fn(),
});
