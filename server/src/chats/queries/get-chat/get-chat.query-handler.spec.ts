import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { requestUserStub } from 'users/test/stubs';
import { ChatsPrismaMock } from 'chats/test/mocks';
import { FullChat } from 'chats/chats.interfaces';
import { UsersSelector } from 'users/users.selector';
import { fullChatStub } from 'chats/test/stubs';
import { GetChatQueryHandler } from './get-chat.query-handler';
import { GetChatQuery } from './get-chat.query';
import { ChatsSelector } from 'chats/chats.selector';

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
        .mockResolvedValue({ id: fullChatStub().id });
      prismaService.chat.findUnique = jest
        .fn()
        .mockResolvedValue(fullChatStub());
      prismaService.message.count = jest.fn().mockResolvedValue(20);
    });

    let chat: FullChat;
    const chatId = fullChatStub().id;

    beforeEach(async () => {
      jest.clearAllMocks();
      chat = await getChatQueryHandler.execute(
        new GetChatQuery(requestUserStub(), chatId),
      );
    });

    it('should call chat find first', () => {
      expect(prismaService.chat.findFirst).toBeCalledTimes(1);
      expect(prismaService.chat.findFirst).toBeCalledWith({
        where: {
          id: chatId,
          users: { some: { id: requestUserStub().id } },
        },
        select: { id: true },
      });
    });

    it('should call message count', () => {
      expect(prismaService.message.count).toBeCalledTimes(1);
      expect(prismaService.message.count).toBeCalledWith({
        where: { chatId },
      });
    });

    it('should call chat find unique', () => {
      expect(prismaService.chat.findUnique).toBeCalledTimes(1);
      expect(prismaService.chat.findUnique).toBeCalledWith({
        where: { id: chatId },
        select: {
          id: true,
          messages: {
            orderBy: { createdAt: 'asc' },
            select: ChatsSelector.selectMessage(),
            skip: 0,
            take: 20,
          },
          users: {
            where: { id: { not: requestUserStub().id } },
            select: UsersSelector.selectShortUser(),
          },
          blocked: true,
          blockedById: true,
        },
      });
    });

    it('should return a full chat', () => {
      // to reduce stubs - short chat
      expect(chat).toEqual(fullChatStub());
    });
  });

  describe('when there is no such chat', () => {
    beforeAll(() => {
      prismaService.chat.findFirst = jest.fn().mockResolvedValue(undefined);
    });

    let chat: FullChat;
    let error;
    const chatId = fullChatStub().id;

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        chat = await getChatQueryHandler.execute(
          new GetChatQuery(requestUserStub(), chatId),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call chat find first', () => {
      expect(prismaService.chat.findFirst).toBeCalledTimes(1);
      expect(prismaService.chat.findFirst).toBeCalledWith({
        where: {
          id: chatId,
          users: { some: { id: requestUserStub().id } },
        },
        select: { id: true },
      });
    });

    it('should not call message count', () => {
      expect(prismaService.message.count).not.toBeCalled();
    });

    it('should not call chat find unique', () => {
      expect(prismaService.chat.findUnique).not.toBeCalled();
    });

    it('should return undefined', () => {
      expect(chat).toEqual(undefined);
    });

    it('should throw an error', () => {
      expect(error?.status).toEqual(404);
      expect(error?.message).toEqual('Not Found');
    });
  });
});
