import { ChatsSelector } from 'chats/chats.selector';
import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { ChatsPrismaMock } from 'chats/test/mocks';
import { fullChatStub, messageStub, shortChatStub } from 'chats/test/stubs';
import { GetMessagesQueryHandler } from './get-messages.query-handler';
import { GetMessagesQuery, GetMessagesQueryReturn } from './get-messages.query';
import { requestUserStub } from 'users/test/stubs';
import { NOT_FOUND } from 'common/constants/error';

describe('when get messages is called', () => {
  let prismaService: PrismaService;
  let getMessagesQueryHandler: GetMessagesQueryHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GetMessagesQueryHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(ChatsPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    getMessagesQueryHandler = moduleRef.get<GetMessagesQueryHandler>(
      GetMessagesQueryHandler,
    );
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      prismaService.chat.findFirst = jest
        .fn()
        .mockResolvedValue(fullChatStub());
      prismaService.message.count = jest.fn().mockResolvedValue(40);
      prismaService.message.findMany = jest
        .fn()
        .mockResolvedValue([messageStub()]);
    });

    let response: GetMessagesQueryReturn;

    beforeEach(async () => {
      jest.clearAllMocks();
      response = await getMessagesQueryHandler.execute(
        new GetMessagesQuery(requestUserStub(), shortChatStub().id, 0),
      );
    });

    it('should call chat find first', () => {
      expect(prismaService.chat.findFirst).toBeCalledTimes(1);
      expect(prismaService.chat.findFirst).toBeCalledWith({
        where: {
          id: shortChatStub().id,
          users: { some: { id: requestUserStub().id } },
        },
        select: { id: true },
      });
    });

    it('should call message count', () => {
      expect(prismaService.message.count).toBeCalledTimes(1);
      expect(prismaService.message.count).toBeCalledWith({
        where: { chatId: shortChatStub().id },
      });
    });

    it('should call message find many', () => {
      expect(prismaService.message.findMany).toBeCalledTimes(1);
      expect(prismaService.message.findMany).toBeCalledWith({
        where: {
          chatId: shortChatStub().id,
        },
        select: ChatsSelector.selectMessage(),
        orderBy: { createdAt: 'asc' },
        skip: 20,
        take: 20,
      });
    });

    it('should return an array of messages with chat id', () => {
      expect(response).toEqual({
        chatId: shortChatStub().id,
        messages: [messageStub()],
      });
    });
  });

  describe('when there is no such chat', () => {
    beforeAll(() => {
      prismaService.chat.findFirst = jest.fn().mockResolvedValue(undefined);
      prismaService.message.count = jest.fn();
      prismaService.message.findMany = jest.fn();
    });

    let response: GetMessagesQueryReturn;
    let error;

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        response = await getMessagesQueryHandler.execute(
          new GetMessagesQuery(requestUserStub(), shortChatStub().id, 0),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call chat find first', () => {
      expect(prismaService.chat.findFirst).toBeCalledTimes(1);
      expect(prismaService.chat.findFirst).toBeCalledWith({
        where: {
          id: shortChatStub().id,
          users: { some: { id: requestUserStub().id } },
        },
        select: { id: true },
      });
    });

    it('should not call message count', () => {
      expect(prismaService.message.count).not.toBeCalled();
    });

    it('should not call message find many', () => {
      expect(prismaService.message.findMany).not.toBeCalled();
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });

    it('should throw an error', () => {
      expect(error?.message).toEqual(NOT_FOUND);
    });
  });

  describe('when there are no such messages (< than have count)', () => {
    beforeAll(() => {
      prismaService.chat.findFirst = jest
        .fn()
        .mockResolvedValue(fullChatStub());
      prismaService.message.count = jest.fn().mockResolvedValue(40);
      prismaService.message.findMany = jest.fn();
    });

    let response: GetMessagesQueryReturn;
    let error;

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        response = await getMessagesQueryHandler.execute(
          new GetMessagesQuery(requestUserStub(), shortChatStub().id, 60),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call chat find first', () => {
      expect(prismaService.chat.findFirst).toBeCalledTimes(1);
      expect(prismaService.chat.findFirst).toBeCalledWith({
        where: {
          id: shortChatStub().id,
          users: { some: { id: requestUserStub().id } },
        },
        select: { id: true },
      });
    });

    it('should call message count', () => {
      expect(prismaService.message.count).toBeCalledTimes(1);
      expect(prismaService.message.count).toBeCalledWith({
        where: { chatId: shortChatStub().id },
      });
    });

    it('should not call message find many', () => {
      expect(prismaService.message.findMany).not.toBeCalled();
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });

    it('should throw an error', () => {
      expect(error?.message).toEqual(NOT_FOUND);
    });
  });
});
