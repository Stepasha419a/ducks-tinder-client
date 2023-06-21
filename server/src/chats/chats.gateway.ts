import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Server, Socket } from 'socket.io';
import { ConnectedSocket, MessageBody } from '@nestjs/websockets';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { GetMessagesDto, SendMessageDto } from './dto';
import { SendMessageCommand } from './commands';
import { GetMessagesQuery } from './queries';

@WebSocketGateway({ namespace: '/chat/socket', cors: '*:*', origin: true })
export class ChatsGateway {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @WebSocketServer()
  wss: Server;

  @SubscribeMessage('connectChat')
  handleConnectChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() chatId: string,
  ) {
    client.join(chatId);

    client.emit('connected', chatId);
  }

  @SubscribeMessage('disconnectChat')
  handleDisconnectChat(@ConnectedSocket() client: Socket) {
    const newStr = client.request.url.slice(
      client.request.url.indexOf('=') + 1,
    );
    const chatId = newStr.slice(0, newStr.indexOf('&'));

    client.leave(chatId);
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() dto: SendMessageDto) {
    const message = await this.commandBus.execute(new SendMessageCommand(dto));

    this.wss.to(dto.chatId).emit('message', message);
  }

  @SubscribeMessage('get-messages')
  async getMessages(@MessageBody() dto: GetMessagesDto) {
    const messages = await this.queryBus.execute(new GetMessagesQuery(dto));

    this.wss.to(dto.chatId).emit('get-messages', messages);
  }
}
