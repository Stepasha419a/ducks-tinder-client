import { userStub, shortUserStub } from '../stubs';

export const UsersServiceMock = jest.fn().mockReturnValue({
  getSorted: jest.fn().mockResolvedValue(shortUserStub()),
  patch: jest.fn().mockResolvedValue(userStub()),
  savePicture: jest.fn().mockResolvedValue(userStub()),
  deletePicture: jest.fn().mockResolvedValue(userStub()),
  mixPictures: jest.fn().mockResolvedValue(userStub()),
  getPairs: jest.fn().mockResolvedValue([shortUserStub()]),
  deletePair: jest.fn().mockResolvedValue([shortUserStub()]),
  likeUser: jest.fn().mockResolvedValue({}),
  dislikeUser: jest.fn().mockResolvedValue({}),
  returnUser: jest.fn().mockResolvedValue({}),
});
