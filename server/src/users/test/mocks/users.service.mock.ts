import { userDtoStub, shortUserStub } from '../stubs';

export const UsersServiceMock = jest.fn().mockReturnValue({
  getSorted: jest.fn().mockResolvedValue(shortUserStub()),
  patch: jest.fn().mockResolvedValue(userDtoStub()),
  savePicture: jest.fn().mockResolvedValue(userDtoStub()),
  deletePicture: jest.fn().mockResolvedValue(userDtoStub()),
  mixPictures: jest.fn().mockResolvedValue(userDtoStub()),
  getPairs: jest.fn().mockResolvedValue([shortUserStub()]),
  deletePair: jest.fn().mockResolvedValue([shortUserStub()]),
  likeUser: jest.fn().mockResolvedValue({}),
  dislikeUser: jest.fn().mockResolvedValue({}),
  returnUser: jest.fn().mockResolvedValue({}),
});
