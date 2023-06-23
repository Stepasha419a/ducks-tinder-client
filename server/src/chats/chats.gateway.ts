import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Server } from 'socket.io';
import { ConnectedSocket, MessageBody, WsException } from '@nestjs/websockets';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UserSocket } from 'common/types/user-socket';
import { GetMessagesDto, SendMessageDto } from './dto';
import { SendMessageCommand } from './commands';
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

  @SubscribeMessage('connectChat')
  async handleConnectChat(
    @ConnectedSocket() client: UserSocket,
    @MessageBody() chatId: string,
  ) {
    await this.queryBus.execute(
      new ValidateChatMemberQuery(client.request.user, chatId),
    );
    client.join(chatId);

    client.emit('connected', chatId);
  }

  @SubscribeMessage('disconnectChat')
  handleDisconnectChat(@ConnectedSocket() client: UserSocket) {
    const chatId = client?.handshake?.query?.chatId as string | undefined;
    if (!chatId) {
      throw new WsException('Not found');
    }

    client.leave(chatId);
  }

  @SubscribeMessage('message')
  async sendMessage(
    @ConnectedSocket() client: UserSocket,
    @MessageBody() dto: SendMessageDto,
  ) {
    const message = await this.commandBus.execute(
      new SendMessageCommand(client.request.user, dto),
    );

    this.wss.to(dto.chatId).emit('message', message);
  }

  @SubscribeMessage('get-messages')
  async getMessages(
    @ConnectedSocket() client: UserSocket,
    @MessageBody() dto: GetMessagesDto,
  ) {
    const messages = await this.queryBus.execute(
      new GetMessagesQuery(client.request.user, dto),
    );

    this.wss.to(dto.chatId).emit('get-messages', messages);
  }
}
