import { TokensModule } from './../tokens/tokens.module';
import { UsersModule } from './../users/users.module';
import { ChatsGateway } from './chats.gateway';
import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { MessagesService } from './services/messages.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ChatsController],
  providers: [ChatsService, ChatsGateway, MessagesService],
  imports: [PrismaModule, UsersModule, TokensModule],
})
export class ChatsModule {}
