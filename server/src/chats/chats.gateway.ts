import { MessagesService } from './services/messages.service';
import { ChatsService } from './chats.service';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ISendMessage } from './chats.interfaces';

@WebSocketGateway({ namespace: '/chat/socket', cors: '*:*', origin: true })
export class ChatsGateway {
  constructor(
    private readonly chatService: ChatsService,
    private readonly messagesService: MessagesService,
  ) {}

  @WebSocketServer()
  wss: Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: ISendMessage) {
    const chatId = this.chatService.parseUrl(client.request.url);

    this.wss.to(chatId).emit('message', message);

    this.messagesService.sendMessage(chatId, message);
  }

  @SubscribeMessage('connectChat')
  handleConnectChat(client: Socket) {
    const chatId = this.chatService.parseUrl(client.request.url);

    client.join(chatId);

    client.emit('connected', chatId);
  }

  @SubscribeMessage('disconnectChat')
  handleDisconnectChat(client: Socket) {
    const chatId = this.chatService.parseUrl(client.request.url);

    client.leave(chatId);

    client.emit('disconnected', chatId);
  }
}
