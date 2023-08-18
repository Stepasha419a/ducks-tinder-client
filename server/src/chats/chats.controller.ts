import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetChatQuery, GetChatsQuery } from './queries';
import { User } from 'common/decorators';
import { CustomValidationPipe } from 'common/pipes';
import { ValidatedUserDto } from 'users/dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  getChats(@User(CustomValidationPipe) user: ValidatedUserDto) {
    return this.queryBus.execute(new GetChatsQuery(user));
  }

  @Get(':id')
  getChat(
    @User(CustomValidationPipe) user: ValidatedUserDto,
    @Param('id') id: string,
  ) {
    return this.queryBus.execute(new GetChatQuery(user, id));
  }
}
