import { ChatsService } from './chats.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Controller('chat')
@UseGuards(AuthGuard)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get(':userId')
  getAll(@Param('userId') userId) {
    return this.chatsService.getAll(userId);
  }

  @Get('one/:id')
  getOne(@Param('id') id) /* : Promise<IChat> */ {
    return this.chatsService.getOne(id);
  }

  @Post()
  create(@Body() members: string[]) /* : Promise<IChat> */ {
    return this.chatsService.create(members);
  }
}
