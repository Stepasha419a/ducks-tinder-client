import { IChat } from './chat.interface';
import { ChatService } from './chat.service';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('chat')
@UseGuards(AuthGuard)
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Get(':userId')
    getAll(@Param('userId') userId): Promise<IChat[]> {
        return this.chatService.getAll(userId)
    }

    @Get('one/:id')
    getOne(@Param('id') id): Promise<IChat> {
        return this.chatService.getOne(id)
    }

    @Post()
    create(@Body() members: string[]): Promise<IChat> {
        return this.chatService.create(members)
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<IChat> {
        return this.chatService.delete(id)
    }
}
