import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { ChatsServiceMock, UsersPrismaMock } from 'users/test/mocks';
import { requestUserStub, userDtoStub } from 'users/test/stubs';
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
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        PrismaModule,
        ChatsModule,
      ],
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
      prismaService.user.findUnique = jest.fn().mockResolvedValue({
        ...userDtoStub(),
        id: '34545656',
        pairs: [{ ...userDtoStub().firstPair, id: '34545656' }],
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

    it('should call user find unique', () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(3);
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(1, {
        where: { id: userPairId },
      });
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(2, {
        where: { id: userDtoStub().id },
        select: { pairs: { select: { id: true } } },
      });
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(3, {
        where: { id: userDtoStub().id },
        select: { pairs: { select: UsersSelector.selectShortUser() } },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: userDtoStub().id },
        data: { pairs: { disconnect: { id: '34545656' } } },
      });
    });

    it('should call chatService create', () => {
      expect(chatsService.create).toBeCalledTimes(1);
      expect(chatsService.create).toBeCalledWith([
        userDtoStub().id,
        userPairId,
      ]);
    });

    it('should return pairs', () => {
      expect(pairs).toEqual([{ ...userDtoStub().firstPair, id: '34545656' }]);
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

    it('should call user find unique', () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(1, {
        where: { id: userPairId },
      });
    });

    it('should not call user update', () => {
      expect(chatsService.create).not.toBeCalled();
    });

    it('should not call chatService create', () => {
      expect(chatsService.create).not.toBeCalled();
    });

    it('should return undefined', () => {
      expect(pairs).toEqual(undefined);
    });
  });

  describe('when there is no such user pair', () => {
    beforeAll(() => {
      prismaService.user.findUnique = jest.fn(() => {
        return {
          ...userDtoStub(),
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

    it('should call user find unique', () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(2);
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(1, {
        where: { id: userPairId },
      });
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(2, {
        where: { id: userDtoStub().id },
        select: { pairs: { select: { id: true } } },
      });
    });

    it('should not call user update', () => {
      expect(chatsService.create).not.toBeCalled();
    });

    it('should not call chatService create', () => {
      expect(chatsService.create).not.toBeCalled();
    });

    it('should return undefined', () => {
      expect(pairs).toEqual(undefined);
    });
  });
});
