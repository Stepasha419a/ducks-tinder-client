import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Server } from 'socket.io';
import { ConnectedSocket, MessageBody, WsException } from '@nestjs/websockets';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UserSocket } from 'common/types/user-socket';
import { DeleteMessageCommand, SendMessageCommand } from './commands';
import { GetMessagesQuery, ValidateChatMemberQuery } from './queries';
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'common/guards';

@UseGuards(AccessTokenGuard)
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

  @SubscribeMessage('connect-chat')
  async handleConnectChat(@ConnectedSocket() client: UserSocket) {
    const chatId = client?.handshake?.query?.chatId as string | undefined;
    if (!chatId) {
      throw new WsException('Not found');
    }
    await this.queryBus.execute(
      new ValidateChatMemberQuery(client.request.user, chatId),
    );
    client.join(chatId);

    client.emit('connect-chat', chatId);
  }

  @SubscribeMessage('disconnect-chat')
  handleDisconnectChat(@ConnectedSocket() client: UserSocket) {
    const chatId = client?.handshake?.query?.chatId as string | undefined;
    if (!chatId) {
      throw new WsException('Not found');
    }

    client.leave(chatId);
  }

  @SubscribeMessage('send-message')
  async sendMessage(
    @ConnectedSocket() client: UserSocket,
    @MessageBody() text: string,
  ) {
    const chatId = client?.handshake?.query?.chatId as string | undefined;
    if (!chatId) {
      throw new WsException('Not found');
    }

    const message = await this.commandBus.execute(
      new SendMessageCommand(client.request.user, chatId, text),
    );

    this.wss.to(chatId).emit('send-message', message);
  }

  @SubscribeMessage('get-messages')
  async getMessages(
    @ConnectedSocket() client: UserSocket,
    @MessageBody() haveCount: number,
  ) {
    const chatId = client?.handshake?.query?.chatId as string | undefined;
    if (!chatId) {
      throw new WsException('Not found');
    }
    const messages = await this.queryBus.execute(
      new GetMessagesQuery(client.request.user, chatId, haveCount),
    );

    this.wss.to(chatId).emit('get-messages', messages);
  }

  @SubscribeMessage('delete-message')
  async deleteMessage(
    @ConnectedSocket() client: UserSocket,
    @MessageBody() messageId: string,
  ) {
    const chatId = client?.handshake?.query?.chatId as string | undefined;
    if (!chatId) {
      throw new WsException('Not found');
    }

    const message = await this.commandBus.execute(
      new DeleteMessageCommand(client.request.user, messageId),
    );

    this.wss.to(chatId).emit('delete-message', message);
  }
}
