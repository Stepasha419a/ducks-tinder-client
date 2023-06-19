import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'users/test/mocks';
import { userDtoStub } from 'users/test/stubs';
import { GetUserQueryHandler } from './get-user.query-handler';
import { GetUserQuery } from './get-user.query';
import { UserDto } from 'users/dto';
import { UsersSelector } from 'users/users.selector';

describe('when get user is called', () => {
  let prismaService: PrismaService;
  let getUserQueryHandler: GetUserQueryHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GetUserQueryHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    getUserQueryHandler =
      moduleRef.get<GetUserQueryHandler>(GetUserQueryHandler);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      prismaService.user.findUnique = jest.fn().mockResolvedValue({
        ...userDtoStub(),
        pairs: [userDtoStub().firstPair],
      });
      prismaService.user.count = jest.fn().mockResolvedValue(5);
    });

    let user: UserDto;

    beforeEach(async () => {
      jest.clearAllMocks();
      user = await getUserQueryHandler.execute(
        new GetUserQuery(userDtoStub().id),
      );
    });

    it('should call count', async () => {
      expect(prismaService.user.count).toBeCalledTimes(1);
      expect(prismaService.user.count).toBeCalledWith({
        where: { pairFor: { some: { id: userDtoStub().id } } },
      });
    });

    it('should call find unique', async () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toBeCalledWith({
        where: { id: userDtoStub().id },
        include: UsersSelector.selectUser(),
      });
    });

    it('should return a user', async () => {
      expect(user).toEqual(userDtoStub());
    });
  });
});
