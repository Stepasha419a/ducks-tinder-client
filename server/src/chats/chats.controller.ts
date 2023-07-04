import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetChatQuery, GetChatsQuery } from './queries';
import { User } from 'common/decorators';

@Controller('chats')
export class ChatsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  getChats(@User() user) {
    return this.queryBus.execute(new GetChatsQuery(user));
  }

  @Get(':id')
  getChat(@User() user, @Param('id') id: string) {
    return this.queryBus.execute(new GetChatQuery(user, id));
  }
}
