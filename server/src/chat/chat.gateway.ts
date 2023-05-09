import { MessageService } from './services/message.service';
import { ChatService } from './chat.service';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ISendMessage } from './chat.interfaces';

@WebSocketGateway({ namespace: '/chat/socket', cors: '*:*', origin: true })
export class ChatGateway {
  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
  ) {}

  @WebSocketServer()
  wss: Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: ISendMessage) {
    const chatId = this.chatService.parseUrl(client.request.url);

    this.wss.to(chatId).emit('message', message);

    this.messageService.sendMessage(chatId, message);
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
