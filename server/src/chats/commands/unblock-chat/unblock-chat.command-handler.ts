import { WsException } from '@nestjs/websockets';
import { PrismaService } from 'prisma/prisma.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnblockChatCommand } from './unblock-chat.command';
import { FullChat } from 'chats/chats.interface';
import { NOT_FOUND } from 'common/constants/error';
import { ChatsSelector } from 'chats/chats.selector';
import { UsersSelector } from 'users/users.selector';

@CommandHandler(UnblockChatCommand)
export class UnblockChatCommandHandler
  implements ICommandHandler<UnblockChatCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: UnblockChatCommand): Promise<FullChat> {
    const { user, chatId } = command;

    const candidate = await this.prismaService.chat.findFirst({
      where: { id: chatId, blocked: true, blockedById: user.id },
    });
    if (!candidate) {
      throw new WsException(NOT_FOUND);
    }

    const messagesCount = await this.prismaService.message.count({
      where: { chatId },
    });

    const skipCount = messagesCount > 20 ? messagesCount - 20 : 0;

    const unblockedChat = await this.prismaService.chat.update({
      where: { id: chatId },
      data: { blocked: false, blockedById: null },
      select: {
        id: true,
        messages: {
          skip: skipCount,
          take: 20,
          orderBy: { createdAt: 'asc' },
          select: ChatsSelector.selectMessage(),
        },
        users: {
          where: { id: { not: user.id } },
          select: UsersSelector.selectShortUser(),
        },
        blocked: true,
        blockedById: true,
      },
    });

    return { ...unblockedChat, messagesCount };
  }
}
