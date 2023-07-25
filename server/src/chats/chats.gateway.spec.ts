import { Test } from '@nestjs/testing';
import { QueryBusMock } from 'users/test/mocks';
import { AccessTokenGuard } from 'common/guards';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import { ChatsGateway } from './chats.gateway';
import { TokensModule } from 'tokens/tokens.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'users/users.module';
import { fullChatStub, messageStub, requestUserStub } from './test/stubs';
import { CommandBusMock, UserSocketMock } from './test/mocks';
import { GetMessagesQuery, ValidateChatMemberQuery } from './queries';
import {
  DeleteMessageDto,
  EditMessageDto,
  GetMessagesDto,
  SendMessageDto,
} from './dto';
import {
  BlockChatCommand,
  DeleteMessageCommand,
  EditMessageCommand,
  SaveLastSeenCommand,
  SendMessageCommand,
  UnblockChatCommand,
} from './commands';
import { CHAT_ID_DTO } from './test/values/chats.const.dto';
import { BlockChatSocketReturn } from './chats.interface';

describe('chats-controller', () => {
  let chatsGateway: ChatsGateway;
  let queryBus: QueryBus;
  let commandBus: CommandBus;
  const mockedWssEmit = jest.fn();

  const mockAccessTokenGuard = jest.fn().mockReturnValue(true);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ChatsGateway],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        CqrsModule,
        TokensModule,
        UsersModule,
      ],
    })
      .overrideGuard(AccessTokenGuard)
      .useValue(mockAccessTokenGuard)
      .overrideProvider(QueryBus)
      .useValue(QueryBusMock())
      .overrideProvider(CommandBus)
      .useValue(CommandBusMock())
      .compile();

    chatsGateway = moduleRef.get<ChatsGateway>(ChatsGateway);
    queryBus = moduleRef.get<QueryBus>(QueryBus);
    commandBus = moduleRef.get<CommandBus>(CommandBus);

    // just to mock wss
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    chatsGateway.wss = {
      to: jest.fn().mockReturnValue({ emit: mockedWssEmit }),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when gateway is ready', () => {
    it('should be defined', () => {
      expect(chatsGateway).toBeDefined();
    });
  });

  describe('when connect-chats is called', () => {
    let response;
    const socket = UserSocketMock();

    beforeEach(async () => {
      response = await chatsGateway.handleConnectChats(
        socket,
        requestUserStub(),
      );
    });

    it('should call socket emit', () => {
      expect(socket.join).toBeCalledTimes(1);
      expect(socket.join).toBeCalledWith(requestUserStub().id);
    });

    it('should call socket emit', () => {
      expect(socket.emit).toBeCalledTimes(1);
      expect(socket.emit).toBeCalledWith('connect-chats');
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when connect-chat is called', () => {
    let response;
    const socket = UserSocketMock();

    beforeAll(() => {
      queryBus.execute = jest.fn().mockResolvedValue(fullChatStub());
    });

    beforeEach(async () => {
      response = await chatsGateway.handleConnectChat(
        socket,
        requestUserStub(),
        CHAT_ID_DTO,
      );
    });

    it('should call query bus execute', () => {
      expect(queryBus.execute).toBeCalledTimes(1);
      expect(queryBus.execute).toBeCalledWith(
        new ValidateChatMemberQuery(requestUserStub(), fullChatStub().id),
      );
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new SaveLastSeenCommand(requestUserStub(), fullChatStub().id),
      );
    });

    it('should call socket emit', () => {
      expect(socket.emit).toBeCalledTimes(1);
      expect(socket.emit).toBeCalledWith('connect-chat');
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when disconnect-chat is called', () => {
    beforeAll(() => {
      commandBus.execute = jest.fn();
    });

    let response;

    beforeEach(async () => {
      response = await chatsGateway.handleDisconnectChat(
        requestUserStub(),
        CHAT_ID_DTO,
      );
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new SaveLastSeenCommand(requestUserStub(), fullChatStub().id),
      );
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when send-message is called', () => {
    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue({
        chatId: fullChatStub().id,
        message: messageStub(),
        users: [requestUserStub().id, '123123'],
      });
    });

    let response;
    const dto: SendMessageDto = {
      chatId: fullChatStub().id,
      repliedId: null,
      text: 'message-text',
    };

    beforeEach(async () => {
      response = await chatsGateway.sendMessage(requestUserStub(), dto);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new SendMessageCommand(requestUserStub(), dto),
      );
    });

    it('should call wss to', () => {
      expect(chatsGateway.wss.to).toBeCalledTimes(1);
      expect(chatsGateway.wss.to).toBeCalledWith([
        requestUserStub().id,
        '123123',
      ]);
    });

    it('should call wss to emit', () => {
      expect(mockedWssEmit).toBeCalledTimes(1);
      expect(mockedWssEmit).toBeCalledWith('send-message', {
        chatId: fullChatStub().id,
        message: messageStub(),
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when get-messages is called', () => {
    beforeAll(() => {
      queryBus.execute = jest.fn().mockResolvedValue({
        chatId: fullChatStub().id,
        messages: [messageStub()],
      });
    });

    let response;
    const dto: GetMessagesDto = {
      chatId: fullChatStub().id,
      haveCount: 0,
    };

    beforeEach(async () => {
      response = await chatsGateway.getMessages(requestUserStub(), dto);
    });

    it('should call query bus execute', () => {
      expect(queryBus.execute).toBeCalledTimes(1);
      expect(queryBus.execute).toBeCalledWith(
        new GetMessagesQuery(requestUserStub(), dto),
      );
    });

    it('should call wss to', () => {
      expect(chatsGateway.wss.to).toBeCalledTimes(1);
      expect(chatsGateway.wss.to).toBeCalledWith(requestUserStub().id);
    });

    it('should call wss to emit', () => {
      expect(mockedWssEmit).toBeCalledTimes(1);
      expect(mockedWssEmit).toBeCalledWith('get-messages', {
        chatId: fullChatStub().id,
        messages: [messageStub()],
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when delete-message is called', () => {
    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue({
        message: messageStub(),
        chatId: fullChatStub().id,
        users: [requestUserStub().id, '123123'],
      });
    });

    let response;
    const dto: DeleteMessageDto = {
      chatId: fullChatStub().id,
      messageId: messageStub().id,
    };

    beforeEach(async () => {
      response = await chatsGateway.deleteMessage(requestUserStub(), dto);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new DeleteMessageCommand(requestUserStub(), dto),
      );
    });

    it('should call wss to', () => {
      expect(chatsGateway.wss.to).toBeCalledTimes(1);
      expect(chatsGateway.wss.to).toBeCalledWith([
        requestUserStub().id,
        '123123',
      ]);
    });

    it('should call wss to emit', () => {
      expect(mockedWssEmit).toBeCalledTimes(1);
      expect(mockedWssEmit).toBeCalledWith('delete-message', {
        message: messageStub(),
        chatId: fullChatStub().id,
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when edit-message is called', () => {
    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue({
        message: messageStub(),
        chatId: fullChatStub().id,
        users: [requestUserStub().id, '123123'],
      });
    });

    let response;
    const dto: EditMessageDto = {
      chatId: fullChatStub().id,
      messageId: messageStub().id,
      text: 'edit-message-text',
    };

    beforeEach(async () => {
      response = await chatsGateway.editMessage(requestUserStub(), dto);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new EditMessageCommand(requestUserStub(), dto),
      );
    });

    it('should call wss to', () => {
      expect(chatsGateway.wss.to).toBeCalledTimes(1);
      expect(chatsGateway.wss.to).toBeCalledWith([
        requestUserStub().id,
        '123123',
      ]);
    });

    it('should call wss to emit', () => {
      expect(mockedWssEmit).toBeCalledTimes(1);
      expect(mockedWssEmit).toBeCalledWith('edit-message', {
        message: messageStub(),
        chatId: fullChatStub().id,
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when block-chat is called', () => {
    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue({
        chatId: fullChatStub().id,
        blocked: true,
        blockedById: requestUserStub().id,
        users: [requestUserStub().id, '123123'],
      });
    });

    let response;

    beforeEach(async () => {
      response = await chatsGateway.blockChat(requestUserStub(), CHAT_ID_DTO);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new BlockChatCommand(requestUserStub(), fullChatStub().id),
      );
    });

    it('should call wss to', () => {
      expect(chatsGateway.wss.to).toBeCalledTimes(1);
      expect(chatsGateway.wss.to).toBeCalledWith([
        requestUserStub().id,
        '123123',
      ]);
    });

    it('should call wss to emit', () => {
      expect(mockedWssEmit).toBeCalledTimes(1);
      expect(mockedWssEmit).toBeCalledWith('block-chat', {
        chatId: fullChatStub().id,
        blocked: true,
        blockedById: requestUserStub().id,
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when unblock-chat is called', () => {
    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue({
        chatId: fullChatStub().id,
        users: [requestUserStub().id, '123123'],
        blocked: false,
        blockedById: null,
      } as BlockChatSocketReturn);
    });

    let response;

    beforeEach(async () => {
      response = await chatsGateway.unblockChat(requestUserStub(), CHAT_ID_DTO);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new UnblockChatCommand(requestUserStub(), fullChatStub().id),
      );
    });

    it('should call wss to', () => {
      expect(chatsGateway.wss.to).toBeCalledTimes(1);
      expect(chatsGateway.wss.to).toBeCalledWith([
        requestUserStub().id,
        '123123',
      ]);
    });

    it('should call wss to emit', () => {
      expect(mockedWssEmit).toBeCalledTimes(1);
      expect(mockedWssEmit).toBeCalledWith('unblock-chat', {
        chatId: fullChatStub().id,
        blocked: false,
        blockedById: null,
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });
});
