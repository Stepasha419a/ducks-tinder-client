import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { ChatsServiceMock, UsersPrismaMock } from 'users/test/mocks';
import { requestUserStub, shortUserStub, userDtoStub } from 'users/test/stubs';
import { ShortUserWithoutDistance } from 'users/users.interface';
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
      try {
        pair = await acceptPairCommandHandler.execute(
          new AcceptPairCommand(requestUserStub(), userPairId),
        );
      } catch {}
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

    it('should call user find unique', () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toBeCalledWith({
        where: { id: userPairId },
        select: UsersSelector.selectShortUser(),
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: { pairs: { disconnect: { id: userPairId } } },
      });
    });

    it('should call chatService create', () => {
      expect(chatsService.create).toBeCalledTimes(1);
      expect(chatsService.create).toBeCalledWith([
        userDtoStub().id,
        userPairId,
      ]);
    });

    it('should return accepted pair', () => {
      expect(pair).toEqual({ ...shortUserStub(), distance: undefined });
    });
  });

  describe('when such user pair does not exist', () => {
    beforeAll(() => {
      prismaService.user.findFirst = jest.fn().mockResolvedValue(undefined);
    });

    let pair: ShortUserWithoutDistance;
    let error;
    const userPairId = '34545656';

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        pair = await acceptPairCommandHandler.execute(
          new AcceptPairCommand(requestUserStub(), userPairId),
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

    it('should not call user find unique', () => {
      expect(prismaService.user.findUnique).not.toBeCalled();
    });

    it('should not call user update', () => {
      expect(chatsService.create).not.toBeCalled();
    });

    it('should not call chatService create', () => {
      expect(chatsService.create).not.toBeCalled();
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
