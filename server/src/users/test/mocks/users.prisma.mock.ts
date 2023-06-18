import { UserSelect } from 'prisma';
import { userStub, shortUserStub } from '../stubs';

export const UsersPrismaMock = jest.fn().mockReturnValue({
  user: {
    create: jest
      .fn()
      .mockResolvedValue({
        ...userStub(),
        _count: { pairFor: 0 },
        interests: [{ id: 'interest-id-1', name: 'programming' }],
      }),
    findUnique: jest.fn((select: UserSelect) => {
      // delete pair unit service test requires equality between input and prisma-find ids
      // => returning pair id which was provided to the service dto
      if (select?.where?.id === '34545656') {
        return {
          ...userStub(),
          id: '34545656',
          _count: { pairFor: 0 },
          interests: [{ id: 'interest-id-1', name: 'programming' }],
        };
      }
      return {
        ...userStub(),
        _count: { pairFor: 0 },
        interests: [{ id: 'interest-id-1', name: 'programming' }],
      };
    }),
    findFirst: jest.fn().mockResolvedValue(shortUserStub()),
    update: jest.fn().mockResolvedValue({
      ...userStub(),
      _count: { pairFor: 0 },
      interests: [{ id: 'interest-id-1', name: 'programming' }],
    }),
  },
  checkedUsers: {
    findUnique: jest.fn().mockResolvedValue(userStub()),
    findMany: jest.fn().mockResolvedValue([]),
    findFirst: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
  interest: {
    findMany: jest
      .fn()
      .mockResolvedValue([{ id: 'interest-id-2', name: 'traveling' }]),
  },
  picture: {
    create: jest.fn(),
    findFirst: jest.fn().mockResolvedValue({
      id: '123123',
      name: '123.jpg',
      userId: userStub().id,
      order: 0,
    }),
    findMany: jest.fn().mockResolvedValue([
      {
        id: '123123',
        name: '123.jpg',
        userId: userStub().id,
        order: 0,
      },
      {
        id: '456456',
        name: '456.jpg',
        userId: userStub().id,
        order: 1,
      },
    ]),
    update: jest.fn(),
    delete: jest.fn(),
  },
});
