export const UsersServiceMock = jest.fn().mockReturnValue({
  getUserByEmail: jest.fn(),
  getUser: jest.fn(),
  createUser: jest.fn(),
});
