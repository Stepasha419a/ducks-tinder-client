import { ChatsGateway } from './chats.gateway';
import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { PrismaModule } from 'prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ChatCommandHandlers } from './commands';
import { ChatQueryHandlers } from './queries';

@Module({
  controllers: [ChatsController],
  providers: [
    ChatsService,
    ChatsGateway,
    ...ChatCommandHandlers,
    ...ChatQueryHandlers,
  ],
  imports: [PrismaModule, CqrsModule],
  exports: [ChatsService],
})
export class ChatsModule {}
