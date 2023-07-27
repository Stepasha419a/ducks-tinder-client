import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { DeleteMessageCommand } from './delete-message.command';
import { ChatSocketMessageReturn } from 'chats/chats.interface';
import { PrismaService } from 'prisma/prisma.service';
import { ChatsSelector } from 'chats/chats.selector';
import { getDatesHourDiff } from 'common/helpers';
import { ChatsMapper } from 'chats/chats.mapper';

@CommandHandler(DeleteMessageCommand)
export class DeleteMessageCommandHandler
  implements ICommandHandler<DeleteMessageCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    command: DeleteMessageCommand,
  ): Promise<ChatSocketMessageReturn> {
    const { user, dto } = command;

    const chat = await this.prismaService.chat.findUnique({
      where: { id: dto.chatId },
      select: { blocked: true, id: true, users: { select: { id: true } } },
    });
    if (!chat || chat?.blocked) {
      throw new ForbiddenException();
    }

    const message = await this.prismaService.message.findFirst({
      where: { id: dto.messageId, userId: user.id },
      select: ChatsSelector.selectMessage(),
    });
    if (!message) {
      throw new NotFoundException();
    }

    const isMessageDeletable =
      getDatesHourDiff(new Date(), new Date(message.createdAt)) < 12;
    if (!isMessageDeletable) {
      throw new ForbiddenException();
    }

    await this.prismaService.message.delete({ where: { id: dto.messageId } });

    return ChatsMapper.mapChatMessage(chat, message);
  }
}
