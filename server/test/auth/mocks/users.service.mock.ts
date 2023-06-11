import { userStub } from 'test/users/stubs';

export const UsersServiceMock = jest.fn().mockReturnValue({
  getUserByEmail: jest.fn().mockResolvedValue({
    ...userStub(),
    _count: { pairFor: 0 },
    password: '$2a$07$HQtmk3r9h1Gg1YiOLO67duUs3GPDg5.KKCtPSm/152gqIALiRvs6q',
  }),
  getUser: jest.fn().mockResolvedValue(userStub()),
  createUser: jest.fn().mockResolvedValue(userStub()),
});
