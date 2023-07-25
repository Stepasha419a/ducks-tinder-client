import { WsException } from '@nestjs/websockets';
import { PrismaService } from 'prisma/prisma.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnblockChatCommand } from './unblock-chat.command';
import { BlockChatSocketReturn } from 'chats/chats.interface';
import { NOT_FOUND } from 'common/constants/error';
import { ChatsMapper } from 'chats/chats.mapper';

@CommandHandler(UnblockChatCommand)
export class UnblockChatCommandHandler
  implements ICommandHandler<UnblockChatCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: UnblockChatCommand): Promise<BlockChatSocketReturn> {
    const { user, chatId } = command;

    const candidate = await this.prismaService.chat.findFirst({
      where: { id: chatId, blocked: true, blockedById: user.id },
    });
    if (!candidate) {
      throw new WsException(NOT_FOUND);
    }

    const unblockedChat = await this.prismaService.chat.update({
      where: { id: chatId },
      data: { blocked: false, blockedById: null },
      select: {
        id: true,
        users: {
          select: { id: true },
        },
        blocked: true,
        blockedById: true,
      },
    });

    return ChatsMapper.mapBlockChat(unblockedChat);
  }
}
