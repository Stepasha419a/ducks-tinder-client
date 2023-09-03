export const UsersPrismaMock = jest.fn().mockReturnValue({
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  },
  checkedUsers: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
  interest: {
    findMany: jest.fn(),
  },
  picture: {
    create: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  place: {
    upsert: jest.fn(),
  },
  alcoholAttitude: {
    findUnique: jest.fn(),
  },
  attentionSign: {
    findUnique: jest.fn(),
  },
  childrenAttitude: {
    findUnique: jest.fn(),
  },
  chronotype: {
    findUnique: jest.fn(),
  },
  communicationStyle: {
    findUnique: jest.fn(),
  },
  education: {
    findUnique: jest.fn(),
  },
  foodPreference: {
    findUnique: jest.fn(),
  },
  personalityType: {
    findUnique: jest.fn(),
  },
  pet: {
    findUnique: jest.fn(),
  },
  smokingAttitude: {
    findUnique: jest.fn(),
  },
  socialNetworksActivity: {
    findUnique: jest.fn(),
  },
  trainingAttitude: {
    findUnique: jest.fn(),
  },
  zodiacSign: {
    findUnique: jest.fn(),
  },
});
