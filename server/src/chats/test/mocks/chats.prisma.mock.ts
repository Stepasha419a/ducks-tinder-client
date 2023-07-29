export const ChatsPrismaMock = jest.fn().mockReturnValue({
  chat: {
    create: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
  },
  message: {
    create: jest.fn(),
  },
  chatVisit: {
    deleteMany: jest.fn(),
    upsert: jest.fn(),
  },
});
