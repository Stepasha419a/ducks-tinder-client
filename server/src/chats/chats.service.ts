import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async getAll(userId: string) {
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
      .populate({ path: 'chat', select: '_id' }); */

    /* return members; */
  }

  async getOne(id: string) /* : Promise<ChatType> */ {
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

    return fullChat; */
  }

  async create(members: string[]) /* : Promise<IChat> */ {
    const chat = await this.prismaService.chat.create({ data: {} });

    const chatToUsers = members.map(async (memberId) => {
      return this.prismaService.chatToUsers.create({
        data: { chatId: chat.id, userId: memberId },
      });
    });

    const createdChat = await this.prismaService.chat.findUnique({
      where: { id: chat.id },
      include: { chatToUsers: { include: { user: true } } },
    });

    return createdChat;
  }

  parseUrl(url: string) {
    const newStr = url.slice(url.indexOf('=') + 1);

    return newStr.slice(0, newStr.indexOf('&'));
  }
}
