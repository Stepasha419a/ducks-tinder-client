import { Controller } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chat')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  /* @Get(':userId')
  getAll(@Param('userId') userId) {
    return this.chatsService.getAll(userId);
  }

  @Get('one/:id')
  getOne(@Param('id') id) /* : Promise<IChat> {
    return this.chatsService.getOne(id);
  } */
}
