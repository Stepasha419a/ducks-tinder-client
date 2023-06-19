import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'users/test/mocks';
import { requestUserStub, userDtoStub } from 'users/test/stubs';
import { ShortUser } from 'users/users.interface';
import { UsersSelector } from 'users/users.selector';
import { DeletePairCommandHandler } from './delete-pair.command-handler';
import { DeletePairCommand } from './delete-pair.command';

describe('when delete pair is called', () => {
  let prismaService: PrismaService;
  let deletePairCommandHandler: DeletePairCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [DeletePairCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    deletePairCommandHandler = moduleRef.get<DeletePairCommandHandler>(
      DeletePairCommandHandler,
    );
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      prismaService.user.findUnique = jest.fn().mockResolvedValue({
        ...userDtoStub().firstPair,
        id: '34545656',
        pairs: [{ ...userDtoStub().firstPair, id: '34545656' }],
      });
    });

    let pairs: ShortUser[];
    const userPairId = '34545656';

    beforeEach(async () => {
      jest.clearAllMocks();
      pairs = await deletePairCommandHandler.execute(
        new DeletePairCommand(requestUserStub(), userPairId),
      );
    });

    it('should call user find unique', async () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(3);
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(1, {
        where: { id: requestUserStub().id },
        select: { pairs: { select: { id: true } } },
      });
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(2, {
        where: { id: userPairId },
      });
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(3, {
        where: { id: requestUserStub().id },
        select: { pairs: { select: UsersSelector.selectShortUser() } },
      });
    });

    it('should call user update', async () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          pairs: { disconnect: { id: userPairId } },
        },
      });
    });

    it('should return pairs', async () => {
      expect(pairs).toEqual([userDtoStub().firstPair]);
    });
  });
});
