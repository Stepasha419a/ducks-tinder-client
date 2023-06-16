import { Controller, Get, Req } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserRequest } from 'common/types';
import { GetChatsQuery } from './queries';

@Controller('chats')
export class ChatsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  getChats(@Req() req: UserRequest) {
    return this.queryBus.execute(new GetChatsQuery(req.user));
  }
}
