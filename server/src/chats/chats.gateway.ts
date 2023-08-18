import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Server } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
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
import {
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WsHttpExceptionFilter } from 'common/filters';
import { WsAccessTokenGuard, WsRefreshTokenGuard } from 'common/guards';
import {
  DeleteMessageDto,
  EditMessageDto,
  GetMessagesDto,
  SendMessageDto,
  ChatIdDto,
} from './dto';
import { User } from 'common/decorators';
import {
  BlockChatSocketReturn,
  ChatSocketMessageReturn,
  ChatSocketReturn,
  GetMessagesQueryReturn,
} from './chats.interface';
import { ChatsMapper } from './chats.mapper';
import { CustomValidationPipe } from 'common/pipes';
import { ValidatedUserDto } from 'users/dto';

@UseFilters(WsHttpExceptionFilter)
@UsePipes(ValidationPipe)
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
  async handleConnectChats(
    @ConnectedSocket() client: UserSocket,
    @User({ isSocket: true }, CustomValidationPipe) user: ValidatedUserDto,
  ) {
    client.join(user.id);

    client.emit('connect-chats');
  }

  @UseGuards(WsAccessTokenGuard)
  @SubscribeMessage('connect-chat')
  async handleConnectChat(
    @ConnectedSocket() client: UserSocket,
    @User({ isSocket: true }, CustomValidationPipe) user: ValidatedUserDto,
    @MessageBody() dto: ChatIdDto,
  ) {
    await this.queryBus.execute(new ValidateChatMemberQuery(user, dto));
    await this.commandBus.execute(new SaveLastSeenCommand(user, dto));

    client.emit('connect-chat');
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('disconnect-chat')
  async handleDisconnectChat(
    @User({ isSocket: true }, CustomValidationPipe) user: ValidatedUserDto,
    @MessageBody() dto: ChatIdDto,
  ) {
    await this.commandBus.execute(new SaveLastSeenCommand(user, dto));
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('send-message')
  async sendMessage(
    @User({ isSocket: true }, CustomValidationPipe) user: ValidatedUserDto,
    @MessageBody() dto: SendMessageDto,
  ) {
    const data: ChatSocketMessageReturn = await this.commandBus.execute(
      new SendMessageCommand(user, dto),
    );

    this.wss
      .to(data.users)
      .emit('send-message', ChatsMapper.mapWithoutUsers(data));
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('get-messages')
  async getMessages(
    @User({ isSocket: true }, CustomValidationPipe) user: ValidatedUserDto,
    @MessageBody() dto: GetMessagesDto,
  ) {
    const data: GetMessagesQueryReturn = await this.queryBus.execute(
      new GetMessagesQuery(user, dto),
    );

    this.wss.to(user.id).emit('get-messages', data);
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('delete-message')
  async deleteMessage(
    @User({ isSocket: true }, CustomValidationPipe) user: ValidatedUserDto,
    @MessageBody() dto: DeleteMessageDto,
  ) {
    const data: ChatSocketMessageReturn = await this.commandBus.execute(
      new DeleteMessageCommand(user, dto),
    );

    this.wss
      .to(data.users)
      .emit('delete-message', ChatsMapper.mapWithoutUsers(data));
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('edit-message')
  async editMessage(
    @User({ isSocket: true }, CustomValidationPipe) user: ValidatedUserDto,
    @MessageBody() dto: EditMessageDto,
  ) {
    const data: ChatSocketMessageReturn = await this.commandBus.execute(
      new EditMessageCommand(user, dto),
    );

    this.wss
      .to(data.users)
      .emit('edit-message', ChatsMapper.mapWithoutUsers(data));
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('block-chat')
  async blockChat(
    @User({ isSocket: true }, CustomValidationPipe) user: ValidatedUserDto,
    @MessageBody() dto: ChatIdDto,
  ) {
    const chat: BlockChatSocketReturn = await this.commandBus.execute(
      new BlockChatCommand(user, dto),
    );

    this.wss
      .to(chat.users)
      .emit('block-chat', ChatsMapper.mapWithoutUsers(chat));
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('unblock-chat')
  async unblockChat(
    @User({ isSocket: true }, CustomValidationPipe) user: ValidatedUserDto,
    @MessageBody() dto: ChatIdDto,
  ) {
    const chat: BlockChatSocketReturn = await this.commandBus.execute(
      new UnblockChatCommand(user, dto),
    );

    this.wss
      .to(chat.users)
      .emit('unblock-chat', ChatsMapper.mapWithoutUsers(chat));
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('delete-chat')
  async deleteChat(
    @User({ isSocket: true }, CustomValidationPipe) user: ValidatedUserDto,
    @MessageBody() dto: ChatIdDto,
  ) {
    const chat: ChatSocketReturn = await this.commandBus.execute(
      new DeleteChatCommand(user, dto),
    );

    this.wss.to(chat.users).emit('delete-chat', chat.chatId);
  }
}
