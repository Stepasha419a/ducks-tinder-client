import { ChatsGateway } from './chats.gateway';
import { Module, forwardRef } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { PrismaModule } from 'prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ChatCommandHandlers } from './commands';
import { ChatQueryHandlers } from './queries';
import { TokensModule } from 'tokens/tokens.module';
import { UsersModule } from 'users/users.module';

@Module({
  controllers: [ChatsController],
  providers: [
    ChatsService,
    ChatsGateway,
    ...ChatCommandHandlers,
    ...ChatQueryHandlers,
  ],
  imports: [
    PrismaModule,
    CqrsModule,
    TokensModule,
    forwardRef(() => UsersModule),
  ],
  exports: [ChatsService],
})
export class ChatsModule {}
