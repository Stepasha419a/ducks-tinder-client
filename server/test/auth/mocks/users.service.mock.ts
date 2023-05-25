import { userStub } from 'test/users/stubs';

export const UsersServiceMock = jest.fn().mockReturnValue({
  getByEmail: jest.fn().mockResolvedValueOnce(undefined),
  getOne: jest.fn().mockResolvedValue(userStub()),
  create: jest.fn().mockResolvedValue(userStub()),
});
