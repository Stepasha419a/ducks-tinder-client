import { userDataStub } from '../test/stubs';

export const UsersService = jest.fn().mockReturnValue({
  getOne: jest.fn().mockResolvedValue(userDataStub()),
  update: jest.fn().mockResolvedValue(userDataStub()),
  delete: jest.fn().mockResolvedValue(userDataStub()),
  getSorted: jest.fn().mockResolvedValue(userDataStub()),
  savePicture: jest.fn().mockResolvedValue(userDataStub()),
  deletePicture: jest.fn().mockResolvedValue(userDataStub()),
});
