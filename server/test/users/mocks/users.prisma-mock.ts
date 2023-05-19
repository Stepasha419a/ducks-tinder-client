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
    update: jest
      .fn()
      .mockResolvedValue({ ...userStub(), _count: { pairFor: 0 } }),
  },
  interest: {
    findMany: jest
      .fn()
      .mockResolvedValue([{ id: '123123', name: 'traveling' }]),
  },
  picture: {
    create: jest.fn(),
    findFirst: jest.fn().mockResolvedValue({
      id: '123123',
      name: 'picture-name',
      userId: userStub().id,
      order: 0,
    }),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
