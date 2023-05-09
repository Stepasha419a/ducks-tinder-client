import { UsersService } from './../users/users.service';
import { ChatType } from './chat.interfaces';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './chat.model';
import { ChatToUsers, ChatToUsersDocument } from './models/chat-to-users.model';
import { Message, MessageDocument } from './models/message.model';
import { ChatUserDto } from './dto/chat-user.dto';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<ChatDocument>,
    @InjectModel(ChatToUsers.name)
    private readonly chatToUsersModel: Model<ChatToUsersDocument>,
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
    private readonly usersService: UsersService,
  ) {}

  async getAll(userId: string) {
    const user = await this.usersService.getOne(userId);

    const chats = await this.chatToUsersModel
      .find({ user: user._id })
      .select('_id');

    chats.map(async ({ _id: chatId }) => {
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
    const chat = await this.chatModel.findById(id);

    const members = (
      await this.chatToUsersModel
        .find({ chat: chat._id })
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
  }

  async create(members: string[]) /* : Promise<IChat> */ {
    const chat = await this.chatModel.create({ members: members });

    members.forEach(async (memberId) => {
      await this.chatToUsersModel.create({ user: memberId, chat: chat._id });
    });

    return chat;
  }

  parseUrl(url: string) {
    const newStr = url.slice(url.indexOf('=') + 1);

    return newStr.slice(0, newStr.indexOf('&'));
  }
}
