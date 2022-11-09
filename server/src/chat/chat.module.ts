import { UsersModule } from './../users/users.module';
import { ChatGateway } from './chat.gateway';
import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './chat.model';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  imports: [
    MongooseModule.forFeature([
      {name: Chat.name, schema: ChatSchema}
    ]),
    UsersModule
  ]
})
export class ChatModule {}
