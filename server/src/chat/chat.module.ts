import { TokensModule } from './../tokens/tokens.module';
import { UsersModule } from './../users/users.module';
import { ChatGateway } from './chat.gateway';
import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './chat.model';
import { MessageService } from './services/message.service';
import { Message, MessageSchema } from './models/message.model';
import { ChatToUsers, ChatToUsersSchema } from './models/chat-to-users.model';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, MessageService],
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([
      { name: ChatToUsers.name, schema: ChatToUsersSchema },
    ]),
    UsersModule,
    TokensModule,
  ],
})
export class ChatModule {}
