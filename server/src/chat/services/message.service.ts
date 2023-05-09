import { ChatService } from './../chat.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../models/message.model';
import { ISendMessage } from '../chat.interfaces';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
    private readonly chatService: ChatService,
  ) {}

  async sendMessage(chatId: string, message: ISendMessage) {
    const chat = await this.chatService.getOne(chatId);

    /* await this.messageModel.create({
      chat: chat._id,
      content: message.content,
      user: message.userId,
    }); */
  }
}
