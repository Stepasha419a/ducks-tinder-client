import { ChatService } from './chat.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Controller('chat')
@UseGuards(AuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(':userId')
  getAll(@Param('userId') userId) {
    return this.chatService.getAll(userId);
  }

  @Get('one/:id')
  getOne(@Param('id') id) /* : Promise<IChat> */ {
    return this.chatService.getOne(id);
  }

  @Post()
  create(@Body() members: string[]) /* : Promise<IChat> */ {
    return this.chatService.create(members);
  }
}
