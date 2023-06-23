import { Test } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'users/test/mocks';
import { userDtoStub } from 'users/test/stubs';
import { UsersSelector } from 'users/users.selector';
import { GetUserByEmailQueryHandler } from './get-user-by-email.query-handler';
import { GetUserByEmailQuery } from './get-user-by-email.query';

describe('when get user by email is called', () => {
  let prismaService: PrismaService;
  let getUserByEmailQueryHandler: GetUserByEmailQueryHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GetUserByEmailQueryHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    getUserByEmailQueryHandler = moduleRef.get<GetUserByEmailQueryHandler>(
      GetUserByEmailQueryHandler,
    );
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      prismaService.user.findUnique = jest
        .fn()
        .mockResolvedValue({ ...userDtoStub(), pairsCount: undefined });
      prismaService.user.count = jest.fn().mockResolvedValue(5);
    });

    let user: User;

    beforeEach(async () => {
      jest.clearAllMocks();
      user = (await getUserByEmailQueryHandler.execute(
        new GetUserByEmailQuery(userDtoStub().email),
      )) as User;
    });

    it('should call count', () => {
      expect(prismaService.user.count).toBeCalledTimes(1);
      expect(prismaService.user.count).toBeCalledWith({
        where: { pairFor: { some: { email: userDtoStub().email } } },
      });
    });

    it('should call find unique', () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toBeCalledWith({
        where: { email: userDtoStub().email },
        include: UsersSelector.selectUser(),
      });
    });

    it('should return a user', () => {
      expect(user).toEqual({
        ...userDtoStub(),
        interests: [{ name: 'programming' }],
      });
    });
  });
});
