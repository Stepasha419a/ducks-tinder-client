import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Server } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  WsException,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UserSocket } from 'common/types/user-socket';
import {
  BlockChatCommand,
  DeleteChatCommand,
  DeleteMessageCommand,
  EditMessageCommand,
  SaveLastSeenCommand,
  SendMessageCommand,
  UnblockChatCommand,
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
import { ChatData, User } from 'common/decorators';
import { GetMessagesQueryReturn } from './queries/get-messages/get-messages.query';
import { ChatSocketQueryData } from './chats.interface';

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
  wss: Server;

  @UseGuards(WsAccessTokenGuard)
  @SubscribeMessage('connect-chats')
  async handleConnect(
    @ConnectedSocket() client: UserSocket,
    @User({ isSocket: true }) user,
  ) {
    client.join(user.id);

    client.emit('connect-chats', user.id);
  }

  @UseGuards(WsAccessTokenGuard)
  @SubscribeMessage('connect-chat')
  async handleConnectChat(
    @ConnectedSocket() client: UserSocket,
    @ChatData() chatData: ChatSocketQueryData,
    @User({ isSocket: true }) user,
  ) {
    if (!chatData) {
      throw new WsException(NOT_FOUND);
    }
    await this.queryBus.execute(
      new ValidateChatMemberQuery(user, chatData.chatId),
    );
    await this.commandBus.execute(
      new SaveLastSeenCommand(user, chatData.chatId),
    );

    client.join(user.id);

    client.emit('connect-chat', user.id);
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('disconnect-chat')
  async handleDisconnectChat(
    @ConnectedSocket() client: UserSocket,
    @ChatData() chatData: ChatSocketQueryData,
    @User({ isSocket: true }) user,
  ) {
    if (!chatData) {
      throw new WsException(NOT_FOUND);
    }

    await this.commandBus.execute(
      new SaveLastSeenCommand(user, chatData.chatId),
    );

    client.leave(user.id);
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('send-message')
  async sendMessage(
    @ChatData() chatData: ChatSocketQueryData,
    @User({ isSocket: true }) user,
    @MessageBody() dto: SendMessageDto,
  ) {
    if (!chatData) {
      throw new WsException(NOT_FOUND);
    }

    const message = await this.commandBus.execute(
      new SendMessageCommand(user, chatData.chatId, dto),
    );

    this.wss
      .to([...chatData.userIds, user.id])
      .emit('send-message', { message, chatId: chatData.chatId });
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('get-messages')
  async getMessages(
    @ChatData() chatData: ChatSocketQueryData,
    @User({ isSocket: true }) user,
    @MessageBody() dto: GetMessagesDto,
  ) {
    if (!chatData) {
      throw new WsException(NOT_FOUND);
    }
    const data: GetMessagesQueryReturn = await this.queryBus.execute(
      new GetMessagesQuery(user, chatData.chatId, dto),
    );

    this.wss.to(user.id).emit('get-messages', data);
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('delete-message')
  async deleteMessage(
    @ChatData() chatData: ChatSocketQueryData,
    @User({ isSocket: true }) user,
    @MessageBody() dto: DeleteMessageDto,
  ) {
    if (!chatData) {
      throw new WsException(NOT_FOUND);
    }

    const message = await this.commandBus.execute(
      new DeleteMessageCommand(user, chatData.chatId, dto),
    );

    this.wss
      .to([...chatData.userIds, user.id])
      .emit('delete-message', { message, chatId: chatData.chatId });
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('edit-message')
  async editMessage(
    @ChatData() chatData: ChatSocketQueryData,
    @User({ isSocket: true }) user,
    @MessageBody() dto: EditMessageDto,
  ) {
    if (!chatData) {
      throw new WsException(NOT_FOUND);
    }

    const message = await this.commandBus.execute(
      new EditMessageCommand(user, chatData.chatId, dto),
    );

    this.wss
      .to([...chatData.userIds, user.id])
      .emit('edit-message', { message, chatId: chatData.chatId });
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('block-chat')
  async blockChat(
    @ChatData() chatData: ChatSocketQueryData,
    @User({ isSocket: true }) user,
  ) {
    if (!chatData) {
      throw new WsException(NOT_FOUND);
    }

    const chat = await this.commandBus.execute(
      new BlockChatCommand(user, chatData.chatId),
    );

    this.wss.to([...chatData.userIds, user.id]).emit('block-chat', chat);
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('unblock-chat')
  async unblockChat(
    @ChatData() chatData: ChatSocketQueryData,
    @User({ isSocket: true }) user,
  ) {
    if (!chatData) {
      throw new WsException(NOT_FOUND);
    }

    const chat = await this.commandBus.execute(
      new UnblockChatCommand(user, chatData.chatId),
    );

    this.wss.to([...chatData.userIds, user.id]).emit('unblock-chat', chat);
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('delete-chat')
  async deleteChat(
    @ChatData() chatData: ChatSocketQueryData,
    @User({ isSocket: true }) user,
  ) {
    if (!chatData) {
      throw new WsException(NOT_FOUND);
    }

    const chat = await this.commandBus.execute(
      new DeleteChatCommand(user, chatData.chatId),
    );

    this.wss.to([...chatData.userIds, user.id]).emit('delete-chat', chat);
  }
}
