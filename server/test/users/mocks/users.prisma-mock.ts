import { UserSelect } from 'prisma';
import { userStub, shortUserStub } from '../stubs';

export const UsersPrismaMock = {
  user: {
    create: jest
      .fn()
      .mockResolvedValue({ ...userStub(), _count: { pairFor: 0 } }),
    findUnique: jest.fn((select: UserSelect) => {
      // delete pair unit service test requires equality between input and prisma-find ids
      // => returning pair id which was provided to the service dto
      if (select?.where?.id === '34545656') {
        return { ...userStub(), id: '34545656', _count: { pairFor: 0 } };
      }
      return { ...userStub(), _count: { pairFor: 0 } };
    }),
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
