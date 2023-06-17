import { Controller, Get, Req, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserRequest } from 'common/types';
import { GetChatQuery, GetChatsQuery } from './queries';

@Controller('chats')
export class ChatsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  getChats(@Req() req: UserRequest) {
    return this.queryBus.execute(new GetChatsQuery(req.user));
  }

  @Get(':id')
  getChat(@Req() req: UserRequest, @Param('id') id: string) {
    return this.queryBus.execute(new GetChatQuery(req.user, id));
  }
}
