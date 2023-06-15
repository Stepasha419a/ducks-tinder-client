import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { ChatsServiceMock, UsersPrismaMock } from 'test/users/mocks';
import { requestUserStub, userStub } from 'test/users/stubs';
import { ShortUser } from 'users/users.interface';
import { UsersSelector } from 'users/users.selector';
import { AcceptPairCommandHandler } from './accept-pair.command-handler';
import { AcceptPairCommand } from './accept-pair.command';
import { ChatsModule } from 'chats/chats.module';
import { ChatsService } from 'chats/chats.service';

describe('when accept pair is called', () => {
  let prismaService: PrismaService;
  let chatsService: ChatsService;
  let acceptPairCommandHandler: AcceptPairCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AcceptPairCommandHandler],
      imports: [PrismaModule, ChatsModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .overrideProvider(ChatsService)
      .useValue(ChatsServiceMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    chatsService = moduleRef.get<ChatsService>(ChatsService);
    acceptPairCommandHandler = moduleRef.get<AcceptPairCommandHandler>(
      AcceptPairCommandHandler,
    );
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      let userFindUniqueCount = 1;
      prismaService.user.findUnique = jest.fn(() => {
        userFindUniqueCount++;
        if (userFindUniqueCount === 3) {
          return userStub() as any;
        }
        return {
          ...userStub(),
          id: '34545656',
        };
      });
    });

    let pairs: ShortUser[];
    const userPairId = '34545656';

    beforeEach(async () => {
      jest.clearAllMocks();
      pairs = await acceptPairCommandHandler.execute(
        new AcceptPairCommand(requestUserStub(), userPairId),
      );
    });

    it('should call user find unique', async () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(3);
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(1, {
        where: { id: userPairId },
      });
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(2, {
        where: { id: userStub().id },
        select: { pairs: { select: { id: true } } },
      });
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(3, {
        where: { id: userStub().id },
        select: { pairs: { select: UsersSelector.selectShortUser() } },
      });
    });

    it('should call user update', async () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: userStub().id },
        data: { pairs: { disconnect: { id: '34545656' } } },
      });
    });

    it('should call chatService create', async () => {
      expect(chatsService.create).toBeCalledTimes(1);
      expect(chatsService.create).toBeCalledWith([userStub().id, userPairId]);
    });

    it('should return pairs', async () => {
      expect(pairs).toEqual(userStub().pairs);
    });
  });

  describe('when such user pair does not exist', () => {
    beforeAll(() => {
      prismaService.user.findUnique = jest.fn().mockResolvedValue(undefined);
    });

    let pairs: ShortUser[];
    const userPairId = '34545656';

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        pairs = await acceptPairCommandHandler.execute(
          new AcceptPairCommand(requestUserStub(), userPairId),
        );
      } catch {}
    });

    it('should call user find unique', async () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(1, {
        where: { id: userPairId },
      });
    });

    it('should not call user update', async () => {
      expect(chatsService.create).not.toBeCalled();
    });

    it('should not call chatService create', async () => {
      expect(chatsService.create).not.toBeCalled();
    });

    it('should return undefined', async () => {
      expect(pairs).toEqual(undefined);
    });
  });

  describe('when there is no such user pair', () => {
    beforeAll(() => {
      prismaService.user.findUnique = jest.fn(() => {
        return {
          ...userStub(),
          id: '34545656',
          pairs: [],
        } as any;
      });
    });

    let pairs: ShortUser[];
    const userPairId = '34545656';

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        pairs = await acceptPairCommandHandler.execute(
          new AcceptPairCommand(requestUserStub(), userPairId),
        );
      } catch {}
    });

    it('should call user find unique', async () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(2);
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(1, {
        where: { id: userPairId },
      });
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(2, {
        where: { id: userStub().id },
        select: { pairs: { select: { id: true } } },
      });
    });

    it('should not call user update', async () => {
      expect(chatsService.create).not.toBeCalled();
    });

    it('should not call chatService create', async () => {
      expect(chatsService.create).not.toBeCalled();
    });

    it('should return undefined', async () => {
      expect(pairs).toEqual(undefined);
    });
  });
});
