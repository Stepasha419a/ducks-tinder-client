import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'users/test/mocks';
import { requestUserStub, shortUserStub, userDtoStub } from 'users/test/stubs';
import { GetPairsQueryHandler } from './get-pairs.query-handler';
import { GetPairsQuery } from './get-pairs.query';
import { ShortUser } from 'users/users.interface';
import { UsersSelector } from 'users/users.selector';

describe('when get pairs is called', () => {
  let prismaService: PrismaService;
  let getPairsQueryHandler: GetPairsQueryHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GetPairsQueryHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    getPairsQueryHandler =
      moduleRef.get<GetPairsQueryHandler>(GetPairsQueryHandler);
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      prismaService.user.findUnique = jest
        .fn()
        .mockResolvedValue({ pairs: [shortUserStub()] });
    });

    let pairs: ShortUser[];

    beforeEach(async () => {
      jest.clearAllMocks();
      pairs = await getPairsQueryHandler.execute(
        new GetPairsQuery(requestUserStub()),
      );
    });

    it('should call user find unique', async () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toBeCalledWith({
        where: { id: userDtoStub().id },
        select: {
          pairs: {
            select: UsersSelector.selectShortUser(),
          },
        },
      });
    });

    it('should return pairs', async () => {
      expect(pairs).toEqual([shortUserStub()]);
    });
  });
});
