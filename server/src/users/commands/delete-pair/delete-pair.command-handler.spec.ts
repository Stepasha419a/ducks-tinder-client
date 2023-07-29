import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'users/test/mocks';
import { requestUserStub, shortUserStub } from 'users/test/stubs';
import { ShortUserWithoutDistance } from 'users/users.interface';
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
      prismaService.user.findFirst = jest.fn().mockResolvedValue({
        id: '34545656',
      });
      prismaService.user.findUnique = jest
        .fn()
        .mockResolvedValue({ ...shortUserStub(), distance: undefined });
    });

    let pair: ShortUserWithoutDistance;
    const userPairId = '34545656';

    beforeEach(async () => {
      jest.clearAllMocks();
      pair = await deletePairCommandHandler.execute(
        new DeletePairCommand(requestUserStub(), userPairId),
      );
    });

    it('should call user find first', () => {
      expect(prismaService.user.findFirst).toBeCalledTimes(1);
      expect(prismaService.user.findFirst).toBeCalledWith({
        where: {
          id: userPairId,
          pairFor: { some: { id: requestUserStub().id } },
        },
        select: { id: true },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          pairs: { disconnect: { id: userPairId } },
        },
      });
    });

    it('should call user find unique', () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toBeCalledWith({
        where: { id: userPairId },
        select: UsersSelector.selectShortUser(),
      });
    });

    it('should return deleted pair', () => {
      expect(pair).toEqual({ ...shortUserStub(), distance: undefined });
    });
  });

  describe('when there is no pair', () => {
    beforeAll(() => {
      prismaService.user.findFirst = jest.fn().mockResolvedValue(undefined);
      prismaService.user.findUnique = jest
        .fn()
        .mockResolvedValue({ ...shortUserStub(), distance: undefined });
    });

    let pair: ShortUserWithoutDistance;
    let error;
    const userPairId = '34545656';

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        pair = await deletePairCommandHandler.execute(
          new DeletePairCommand(requestUserStub(), userPairId),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call user find first', () => {
      expect(prismaService.user.findFirst).toBeCalledTimes(1);
      expect(prismaService.user.findFirst).toBeCalledWith({
        where: {
          id: userPairId,
          pairFor: { some: { id: requestUserStub().id } },
        },
        select: { id: true },
      });
    });

    it('should not call user update', () => {
      expect(prismaService.user.update).not.toBeCalled();
    });

    it('should not call user find unique', () => {
      expect(prismaService.user.findUnique).not.toBeCalled();
    });

    it('should throw an error', () => {
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('Not Found');
    });

    it('should return undefined', () => {
      expect(pair).toEqual(undefined);
    });
  });
});
