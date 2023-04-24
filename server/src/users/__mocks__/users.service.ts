import { userStub } from '../test/stubs';

export const UsersService = jest.fn().mockReturnValue({
  getOne: jest.fn().mockResolvedValue(userStub()),
  update: jest.fn().mockResolvedValue(userStub()),
  delete: jest.fn().mockResolvedValue(userStub()),
  getSorted: jest.fn().mockResolvedValue(userStub()),
  savePicture: jest.fn().mockResolvedValue(userStub()),
  deletePicture: jest.fn().mockResolvedValue(userStub()),
  createPair: jest.fn().mockResolvedValue(userStub()),
  deletePair: jest.fn().mockResolvedValue(userStub()),
});
