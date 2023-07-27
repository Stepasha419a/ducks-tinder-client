import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendMessageCommand } from './send-message.command';
import { ChatsSelector } from 'chats/chats.selector';
import { ChatSocketMessageReturn } from 'chats/chats.interface';
import { ChatsMapper } from 'chats/chats.mapper';

@CommandHandler(SendMessageCommand)
export class SendMessageCommandHandler
  implements ICommandHandler<SendMessageCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: SendMessageCommand): Promise<ChatSocketMessageReturn> {
    const { user, dto } = command;

    const chat = await this.prismaService.chat.findUnique({
      where: { id: dto.chatId },
      select: { id: true, blocked: true, users: { select: { id: true } } },
    });
    if (!chat || chat?.blocked) {
      throw new ForbiddenException();
    }

    if (dto.repliedId) {
      const replied = await this.prismaService.message.findUnique({
        where: { id: dto.repliedId },
      });
      if (!replied) {
        throw new NotFoundException();
      }
    }

    const message = await this.prismaService.message.create({
      data: { chatId: dto.chatId, userId: user.id, ...dto },
      select: ChatsSelector.selectMessage(),
    });

    return ChatsMapper.mapChatMessage(chat, message);
  }
}
