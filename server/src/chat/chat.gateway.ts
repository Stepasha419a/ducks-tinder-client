import { ChatService } from './chat.service';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'
import { ISendMessage } from './chat.interface';
import { parseUrl } from './utils/chat.utils';

@WebSocketGateway({namespace: '/chat/socket', cors: '*:*', origin: true})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}
  
  @WebSocketServer()
  wss: Server

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: ISendMessage) {
    const chatId = parseUrl(client.request.url)

    this.wss.to(chatId).emit('message', message)
    
    this.chatService.sendMessage(chatId, message)
  }

  @SubscribeMessage('connectChat')
  handleConnectChat(client: Socket) {
    const chatId = parseUrl(client.request.url)

    client.join(chatId)

    client.emit('connected', chatId)
  }

  @SubscribeMessage('disconnectChat')
  handleDisonnectChat(client: Socket) {
    const chatId = parseUrl(client.request.url)

    client.leave(chatId)

    client.emit('disconnected', chatId)
  }
}