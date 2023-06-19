import { UserSelect } from 'prisma';
import { userDtoStub, shortUserStub } from '../stubs';

export const UsersPrismaMock = jest.fn().mockReturnValue({
  user: {
    create: jest.fn().mockResolvedValue({
      ...userDtoStub(),
      _count: { pairFor: 0 },
      interests: [{ name: 'programming' }],
    }),
    findUnique: jest.fn((select: UserSelect) => {
      // delete pair unit service test requires equality between input and prisma-find ids
      // => returning pair id which was provided to the service dto
      if (select?.where?.id === '34545656') {
        return {
          ...userDtoStub(),
          id: '34545656',
          _count: { pairFor: 0 },
          interests: [{ name: 'programming' }],
        };
      }
      return {
        ...userDtoStub(),
        _count: { pairFor: 0 },
        interests: [{ name: 'programming' }],
      };
    }),
    findFirst: jest.fn().mockResolvedValue(shortUserStub()),
    update: jest.fn().mockResolvedValue({
      ...userDtoStub(),
      _count: { pairFor: 0 },
      interests: [{ name: 'programming' }],
    }),
    count: jest.fn().mockResolvedValue(5),
  },
  checkedUsers: {
    findUnique: jest.fn().mockResolvedValue(userDtoStub()),
    findMany: jest.fn().mockResolvedValue([]),
    findFirst: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
  interest: {
    findMany: jest.fn().mockResolvedValue([{ name: 'traveling' }]),
  },
  picture: {
    create: jest.fn(),
    findFirst: jest.fn().mockResolvedValue({
      id: '123123',
      name: '123.jpg',
      userId: userDtoStub().id,
      order: 0,
    }),
    findMany: jest.fn().mockResolvedValue([
      {
        id: '123123',
        name: '123.jpg',
        userId: userDtoStub().id,
        order: 0,
      },
      {
        id: '456456',
        name: '456.jpg',
        userId: userDtoStub().id,
        order: 1,
      },
    ]),
    update: jest.fn(),
    delete: jest.fn(),
  },
});
