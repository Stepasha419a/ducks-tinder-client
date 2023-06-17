import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { requestUserStub } from 'users/test/stubs';
import { ChatsPrismaMock } from 'chats/test/mocks';
import { FullChat } from 'chats/chats.interfaces';
import { UsersSelector } from 'users/users.selector';
import { shortChatStub } from 'chats/test/stubs';
import { GetChatQueryHandler } from './get-chat.query-handler';
import { GetChatQuery } from './get-chat.query';

describe('when get chats is called', () => {
  let prismaService: PrismaService;
  let getChatQueryHandler: GetChatQueryHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GetChatQueryHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(ChatsPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    getChatQueryHandler =
      moduleRef.get<GetChatQueryHandler>(GetChatQueryHandler);
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      prismaService.chat.findFirst = jest
        .fn()
        .mockResolvedValue({ id: shortChatStub().id });
      prismaService.chat.findUnique = jest
        .fn()
        .mockResolvedValue(shortChatStub());
    });

    let chat: FullChat;
    const chatId = shortChatStub().id;

    beforeEach(async () => {
      jest.clearAllMocks();
      chat = await getChatQueryHandler.execute(
        new GetChatQuery(requestUserStub(), chatId),
      );
    });

    it('should call chat find first', async () => {
      expect(prismaService.chat.findFirst).toBeCalledTimes(1);
      expect(prismaService.chat.findFirst).toBeCalledWith({
        where: {
          id: chatId,
          users: { some: { id: requestUserStub().id } },
        },
        select: { id: true },
      });
    });

    it('should call chat find unique', async () => {
      expect(prismaService.chat.findUnique).toBeCalledTimes(1);
      expect(prismaService.chat.findUnique).toBeCalledWith({
        where: { id: chatId },
        select: {
          id: true,
          messages: {
            orderBy: { createdAt: 'asc' },
            select: { id: true, text: true, userId: true },
          },
          users: {
            where: { id: { not: requestUserStub().id } },
            select: UsersSelector.selectShortUser(),
          },
        },
      });
    });

    it('should return a full chat', async () => {
      // to reduce stubs - short chat
      expect(chat).toEqual(shortChatStub());
    });
  });

  describe('when there is no such chat', () => {
    beforeAll(() => {
      prismaService.chat.findFirst = jest.fn().mockResolvedValue(undefined);
    });

    let chat: FullChat;
    const chatId = shortChatStub().id;

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        chat = await getChatQueryHandler.execute(
          new GetChatQuery(requestUserStub(), chatId),
        );
      } catch {}
    });

    it('should call chat find first', async () => {
      expect(prismaService.chat.findFirst).toBeCalledTimes(1);
      expect(prismaService.chat.findFirst).toBeCalledWith({
        where: {
          id: chatId,
          users: { some: { id: requestUserStub().id } },
        },
        select: { id: true },
      });
    });

    it('should not call chat find unique', async () => {
      expect(prismaService.chat.findUnique).not.toBeCalled();
    });

    it('should return undefined', async () => {
      expect(chat).toEqual(undefined);
    });
  });
});
