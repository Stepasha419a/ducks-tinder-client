import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Server } from 'socket.io';
import { ConnectedSocket, MessageBody, WsException } from '@nestjs/websockets';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UserSocket } from 'common/types/user-socket';
import {
  DeleteMessageCommand,
  EditMessageCommand,
  SendMessageCommand,
} from './commands';
import { GetMessagesQuery, ValidateChatMemberQuery } from './queries';
import { UseGuards } from '@nestjs/common';
import { WsAccessTokenGuard, WsRefreshTokenGuard } from 'common/guards';
import {
  DeleteMessageDto,
  EditMessageDto,
  GetMessagesDto,
  SendMessageDto,
} from './dto';
import { NOT_FOUND } from 'common/constants/error';

@WebSocketGateway({
  namespace: '/chat/socket',
  cors: { origin: true },
  cookie: true,
})
export class ChatsGateway {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @WebSocketServer()
  private readonly wss: Server;

  @UseGuards(WsAccessTokenGuard)
  @SubscribeMessage('connect-chat')
  async handleConnectChat(@ConnectedSocket() client: UserSocket) {
    const chatId = client?.handshake?.query?.chatId as string | undefined;
    if (!chatId) {
      throw new WsException(NOT_FOUND);
    }
    await this.queryBus.execute(
      new ValidateChatMemberQuery(client.request.user, chatId),
    );
    client.join(chatId);

    client.emit('connect-chat', chatId);
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('disconnect-chat')
  handleDisconnectChat(@ConnectedSocket() client: UserSocket) {
    const chatId = client?.handshake?.query?.chatId as string | undefined;
    if (!chatId) {
      throw new WsException(NOT_FOUND);
    }

    client.leave(chatId);
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('send-message')
  async sendMessage(
    @ConnectedSocket() client: UserSocket,
    @MessageBody() dto: SendMessageDto,
  ) {
    const chatId = client?.handshake?.query?.chatId as string | undefined;
    if (!chatId) {
      throw new WsException(NOT_FOUND);
    }

    const message = await this.commandBus.execute(
      new SendMessageCommand(client.request.user, chatId, dto),
    );

    this.wss.to(chatId).emit('send-message', message);
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('get-messages')
  async getMessages(
    @ConnectedSocket() client: UserSocket,
    @MessageBody() dto: GetMessagesDto,
  ) {
    const chatId = client?.handshake?.query?.chatId as string | undefined;
    if (!chatId) {
      throw new WsException(NOT_FOUND);
    }
    const messages = await this.queryBus.execute(
      new GetMessagesQuery(client.request.user, chatId, dto),
    );

    this.wss.to(chatId).emit('get-messages', messages);
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('delete-message')
  async deleteMessage(
    @ConnectedSocket() client: UserSocket,
    @MessageBody() dto: DeleteMessageDto,
  ) {
    const chatId = client?.handshake?.query?.chatId as string | undefined;
    if (!chatId) {
      throw new WsException(NOT_FOUND);
    }

    const message = await this.commandBus.execute(
      new DeleteMessageCommand(client.request.user, dto),
    );

    this.wss.to(chatId).emit('delete-message', message);
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('edit-message')
  async editMessage(
    @ConnectedSocket() client: UserSocket,
    @MessageBody() dto: EditMessageDto,
  ) {
    const chatId = client?.handshake?.query?.chatId as string | undefined;
    if (!chatId) {
      throw new WsException(NOT_FOUND);
    }

    const message = await this.commandBus.execute(
      new EditMessageCommand(client.request.user, dto),
    );

    this.wss.to(chatId).emit('edit-message', message);
  }
}
