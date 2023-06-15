import { ChatsGateway } from './chats.gateway';
import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { MessagesService } from './services/messages.service';
import { PrismaModule } from 'prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ChatCommandHandlers } from './commands';

@Module({
  controllers: [ChatsController],
  providers: [
    ChatsService,
    ChatsGateway,
    MessagesService,
    ...ChatCommandHandlers,
  ],
  imports: [PrismaModule, CqrsModule],
  exports: [ChatsService],
})
export class ChatsModule {}
