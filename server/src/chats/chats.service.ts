import { Chat } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateChatCommand } from './commands/create-chat/create-chat.command';

@Injectable()
export class ChatsService {
  constructor(private readonly commandBus: CommandBus) {}

  async create(memberIds: string[]): Promise<Chat> {
    return this.commandBus.execute(new CreateChatCommand(memberIds));
  }
}
