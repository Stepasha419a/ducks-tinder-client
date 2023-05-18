import { userStub, shortUserStub } from '../stubs';

export const UsersPrismaMock = {
  user: {
    create: jest
      .fn()
      .mockResolvedValue({ ...userStub(), _count: { pairFor: 0 } }),
    findUnique: jest
      .fn()
      .mockResolvedValue({ ...userStub(), _count: { pairFor: 0 } }),
    findFirst: jest.fn().mockResolvedValue(shortUserStub()),
    update: jest.fn().mockResolvedValue(userStub()),
  },
  interest: {
    findMany: jest
      .fn()
      .mockResolvedValue([{ id: '123123', name: 'programming' }]),
  },
};
