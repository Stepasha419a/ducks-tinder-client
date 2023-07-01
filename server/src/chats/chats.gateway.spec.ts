import { Test } from '@nestjs/testing';
import { QueryBusMock } from 'users/test/mocks';
import { AccessTokenGuard } from 'common/guards';
import { CqrsModule, QueryBus } from '@nestjs/cqrs';
import { WebSocketServer } from '@nestjs/websockets';
import { ChatsGateway } from './chats.gateway';
import { TokensModule } from 'tokens/tokens.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'users/users.module';
import { fullChatStub } from './test/stubs';
import { UserSocketMock } from './test/mocks';
import { ValidateChatMemberQuery } from './queries';
import { requestUserStub } from 'users/test/stubs';

describe('chats-controller', () => {
  let chatsGateway: ChatsGateway;
  let queryBus: QueryBus;

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
      .overrideProvider(WebSocketServer)
      .useValue({ to: 'asdasd' })
      .compile();

    chatsGateway = moduleRef.get<ChatsGateway>(ChatsGateway);
    queryBus = moduleRef.get<QueryBus>(QueryBus);
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
      response = await chatsGateway.handleConnectChat(socket);
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
      response = await chatsGateway.handleDisconnectChat(socket);
    });

    it('should call socket leave', () => {
      expect(socket.leave).toBeCalledTimes(1);
      expect(socket.leave).toBeCalledWith(fullChatStub().id);
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });
});
