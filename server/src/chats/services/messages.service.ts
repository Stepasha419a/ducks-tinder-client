import { PrismaService } from '../../prisma/prisma.service';
import { ChatsService } from './../chats.service';
import { Injectable } from '@nestjs/common';
import { ISendMessage } from '../chats.interfaces';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly chatsService: ChatsService,
  ) {}

  async sendMessage(chatId: string, message: ISendMessage) {
    const chat = await this.chatsService.getOne(chatId);

    /* await this.messageModel.create({
      chat: chat._id,
      content: message.content,
      user: message.userId,
    }); */
  }
}
