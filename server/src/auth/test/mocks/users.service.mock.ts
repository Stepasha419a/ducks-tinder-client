import { userDtoStub } from 'users/test/stubs';

export const UsersServiceMock = jest.fn().mockReturnValue({
  getUserByEmail: jest.fn().mockResolvedValue({
    ...userDtoStub(),
    _count: { pairFor: 0 },
    password: '$2a$07$HQtmk3r9h1Gg1YiOLO67duUs3GPDg5.KKCtPSm/152gqIALiRvs6q',
    interests: [{ name: 'programming' }],
  }),
  getUser: jest.fn().mockResolvedValue(userDtoStub()),
  createUser: jest.fn().mockResolvedValue(userDtoStub()),
});
