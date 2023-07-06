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
  SendMessageCommand,
  UnblockChatCommand,
} from './commands';

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

  describe('when connect-chat is called', () => {
    let response;
    const socket = UserSocketMock();

    beforeAll(() => {
      queryBus.execute = jest.fn().mockResolvedValue(fullChatStub());
    });

    beforeEach(async () => {
      response = await chatsGateway.handleConnectChat(
        socket,
        fullChatStub().id,
        requestUserStub(),
      );
    });

    it('should call query bus execute', () => {
      expect(queryBus.execute).toBeCalledTimes(1);
      expect(queryBus.execute).toBeCalledWith(
        new ValidateChatMemberQuery(requestUserStub(), fullChatStub().id),
      );
    });

    it('should call socket join', () => {
      expect(socket.join).toBeCalledTimes(1);
      expect(socket.join).toBeCalledWith(fullChatStub().id);
    });

    it('should call socket emit', () => {
      expect(socket.emit).toBeCalledTimes(1);
      expect(socket.emit).toBeCalledWith('connect-chat', fullChatStub().id);
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when disconnect-chat is called', () => {
    let response;
    const socket = UserSocketMock();

    beforeEach(async () => {
      response = chatsGateway.handleDisconnectChat(socket, fullChatStub().id);
    });

    it('should call socket leave', () => {
      expect(socket.leave).toBeCalledTimes(1);
      expect(socket.leave).toBeCalledWith(fullChatStub().id);
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when send-message is called', () => {
    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue(messageStub());
    });

    let response;
    const dto: SendMessageDto = {
      repliedId: null,
      text: 'message-text',
    };

    beforeEach(async () => {
      response = await chatsGateway.sendMessage(
        fullChatStub().id,
        requestUserStub(),
        dto,
      );
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new SendMessageCommand(requestUserStub(), fullChatStub().id, dto),
      );
    });

    it('should call wss to', () => {
      expect(chatsGateway.wss.to).toBeCalledTimes(1);
      expect(chatsGateway.wss.to).toBeCalledWith(fullChatStub().id);
    });

    it('should call wss to emit', () => {
      expect(mockedWssEmit).toBeCalledTimes(1);
      expect(mockedWssEmit).toBeCalledWith('send-message', messageStub());
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
      haveCount: 0,
    };

    beforeEach(async () => {
      response = await chatsGateway.getMessages(
        fullChatStub().id,
        requestUserStub(),
        dto,
      );
    });

    it('should call query bus execute', () => {
      expect(queryBus.execute).toBeCalledTimes(1);
      expect(queryBus.execute).toBeCalledWith(
        new GetMessagesQuery(requestUserStub(), fullChatStub().id, dto),
      );
    });

    it('should call wss to', () => {
      expect(chatsGateway.wss.to).toBeCalledTimes(1);
      expect(chatsGateway.wss.to).toBeCalledWith(fullChatStub().id);
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
      commandBus.execute = jest.fn().mockResolvedValue(messageStub());
    });

    let response;
    const dto: DeleteMessageDto = {
      messageId: messageStub().id,
    };

    beforeEach(async () => {
      response = await chatsGateway.deleteMessage(
        fullChatStub().id,
        requestUserStub(),
        dto,
      );
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new DeleteMessageCommand(requestUserStub(), fullChatStub().id, dto),
      );
    });

    it('should call wss to', () => {
      expect(chatsGateway.wss.to).toBeCalledTimes(1);
      expect(chatsGateway.wss.to).toBeCalledWith(fullChatStub().id);
    });

    it('should call wss to emit', () => {
      expect(mockedWssEmit).toBeCalledTimes(1);
      expect(mockedWssEmit).toBeCalledWith('delete-message', messageStub());
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when edit-message is called', () => {
    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue(messageStub());
    });

    let response;
    const dto: EditMessageDto = {
      messageId: messageStub().id,
      text: 'edit-message-text',
    };

    beforeEach(async () => {
      response = await chatsGateway.editMessage(
        fullChatStub().id,
        requestUserStub(),
        dto,
      );
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new EditMessageCommand(requestUserStub(), fullChatStub().id, dto),
      );
    });

    it('should call wss to', () => {
      expect(chatsGateway.wss.to).toBeCalledTimes(1);
      expect(chatsGateway.wss.to).toBeCalledWith(fullChatStub().id);
    });

    it('should call wss to emit', () => {
      expect(mockedWssEmit).toBeCalledTimes(1);
      expect(mockedWssEmit).toBeCalledWith('edit-message', messageStub());
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when block-chat is called', () => {
    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue(fullChatStub());
    });

    let response;

    beforeEach(async () => {
      response = await chatsGateway.blockChat(
        fullChatStub().id,
        requestUserStub(),
      );
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new BlockChatCommand(requestUserStub(), fullChatStub().id),
      );
    });

    it('should call wss to', () => {
      expect(chatsGateway.wss.to).toBeCalledTimes(1);
      expect(chatsGateway.wss.to).toBeCalledWith(fullChatStub().id);
    });

    it('should call wss to emit', () => {
      expect(mockedWssEmit).toBeCalledTimes(1);
      expect(mockedWssEmit).toBeCalledWith('block-chat', fullChatStub());
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when unblock-chat is called', () => {
    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue(fullChatStub());
    });

    let response;

    beforeEach(async () => {
      response = await chatsGateway.unblockChat(
        fullChatStub().id,
        requestUserStub(),
      );
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new UnblockChatCommand(requestUserStub(), fullChatStub().id),
      );
    });

    it('should call wss to', () => {
      expect(chatsGateway.wss.to).toBeCalledTimes(1);
      expect(chatsGateway.wss.to).toBeCalledWith(fullChatStub().id);
    });

    it('should call wss to emit', () => {
      expect(mockedWssEmit).toBeCalledTimes(1);
      expect(mockedWssEmit).toBeCalledWith('unblock-chat', fullChatStub());
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });
});
