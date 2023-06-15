import { Chat } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateChatCommand } from './commands/create-chat/create-chat.command';

@Injectable()
export class ChatsService {
  constructor(private readonly commandBus: CommandBus) {}

  async create(memberIds: string[]): Promise<Chat> {
    return this.commandBus.execute(new CreateChatCommand(memberIds));
  }

  /* async getAll(userId: string) {
    const user = await this.usersService.getUser(userId);

    const chats = await this.prismaService.chat.findMany({
      where: { chatToUsers: { some: { userId: user.id } } },
    });

    /* chats.map(async ({ _id: chatId }) => {
      const chatRelation = await this.chatToUsersModel.find({
        user: { $ne: user._id },
      });
      console.log(chatRelation);
    });

    const members = await this.chatToUsersModel
      .find({ user: user._id })
      .populate({
        path: 'user',
        select: 'name pictures.avatar nickname _id',
      })
      .populate({ path: 'chat', select: '_id' });

    return members;
  }

  async getOne(id: string): Promise<ChatType> {
    const chat = await this.prismaService.chat.findUnique({
      where: { id },
    });

    /* const members = (
      await this.prismaService.chat
        .findUnique({ where: { id: chat._id } })
        .populate({ path: 'user', select: 'name pictures.avatar nickname _id' })
        .select('user -_id')
    ).map((user) => new ChatUserDto(user.user));

    const messages = (
      await this.messageModel
        .find({ chat: chat._id })
        .select('content user _id')
    ).map((message) => new MessageDto(message));

    const fullChat = { _id: chat._id, members, messages };

    return fullChat;
  } */

  parseUrl(url: string) {
    const newStr = url.slice(url.indexOf('=') + 1);

    return newStr.slice(0, newStr.indexOf('&'));
  }
}
