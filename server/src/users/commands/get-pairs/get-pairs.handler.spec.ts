import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'test/users/mocks';
import { requestUserStub, userStub } from 'test/users/stubs';
import { GetPairsHandler } from './get-pairs.handler';
import { GetPairsCommand } from './get-pairs.command';
import { ShortUser } from 'users/users.interface';
import { UsersSelector } from 'users/users.selector';

describe('when dislike user is called', () => {
  let prismaService: PrismaService;
  let getPairsHandler: GetPairsHandler;

  const usersPrismaMock = UsersPrismaMock();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GetPairsHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(usersPrismaMock)
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    getPairsHandler = moduleRef.get<GetPairsHandler>(GetPairsHandler);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  let pairs: ShortUser[];

  beforeEach(async () => {
    pairs = await getPairsHandler.execute(
      new GetPairsCommand(requestUserStub()),
    );
  });

  it('should call user find unique', async () => {
    expect(prismaService.user.findUnique).toBeCalledTimes(1);
    expect(prismaService.user.findUnique).toBeCalledWith({
      where: { id: userStub().id },
      select: {
        pairs: {
          select: UsersSelector.selectShortUser(),
        },
      },
    });
  });

  it('should return pairs', async () => {
    expect(pairs).toEqual(userStub().pairs);
  });
});
