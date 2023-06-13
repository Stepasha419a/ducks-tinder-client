export const TokensPrismaMock = jest.fn().mockReturnValue({
  token: {
    findUnique: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
});
