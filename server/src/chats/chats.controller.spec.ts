import { Test } from '@nestjs/testing';
import { QueryBusMock, RequestMock } from 'users/test/mocks';
import { AccessTokenGuard } from 'common/guards';
import { requestUserStub } from 'users/test/stubs';
import { CqrsModule, QueryBus } from '@nestjs/cqrs';
import { ChatsController } from './chats.controller';
import { shortChatStub } from './test/stubs';
import { FullChat, ShortChat } from './chats.interfaces';
import { GetChatQuery, GetChatsQuery } from './queries';

describe('chats-controller', () => {
  let chatsController: ChatsController;
  let queryBus: QueryBus;

  const mockAccessTokenGuard = jest.fn().mockReturnValue(true);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ChatsController],
      imports: [CqrsModule],
    })
      .overrideGuard(AccessTokenGuard)
      .useValue(mockAccessTokenGuard)
      .overrideProvider(QueryBus)
      .useValue(QueryBusMock())
      .compile();

    chatsController = moduleRef.get<ChatsController>(ChatsController);
    queryBus = moduleRef.get<QueryBus>(QueryBus);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when controller is ready', () => {
    it('should be defined', () => {
      expect(chatsController).toBeDefined();
    });
  });

  describe('when get chats is called', () => {
    let chats: ShortChat[];

    beforeAll(() => {
      queryBus.execute = jest.fn().mockResolvedValue([shortChatStub()]);
    });

    beforeEach(async () => {
      chats = await chatsController.getChats(RequestMock());
    });

    it('should call query bus execute', () => {
      expect(queryBus.execute).toBeCalledTimes(1);
      expect(queryBus.execute).toBeCalledWith(
        new GetChatsQuery(requestUserStub()),
      );
    });

    it('should return an array of chats', () => {
      expect(chats).toEqual([shortChatStub()]);
    });
  });

  describe('when get chat is called', () => {
    let chat: FullChat;

    beforeAll(() => {
      queryBus.execute = jest.fn().mockResolvedValue(shortChatStub());
    });

    beforeEach(async () => {
      chat = await chatsController.getChat(RequestMock(), shortChatStub().id);
    });

    it('should call query bus execute', () => {
      expect(queryBus.execute).toBeCalledTimes(1);
      expect(queryBus.execute).toBeCalledWith(
        new GetChatQuery(requestUserStub(), shortChatStub().id),
      );
    });

    it('should return a full chat', () => {
      // to reduce stubs - short chat
      expect(chat).toEqual(shortChatStub());
    });
  });
});
