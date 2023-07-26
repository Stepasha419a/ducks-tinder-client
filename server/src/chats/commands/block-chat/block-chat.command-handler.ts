import { NOT_FOUND } from 'common/constants/error';
import { WsException } from '@nestjs/websockets';
import { PrismaService } from 'prisma/prisma.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BlockChatCommand } from './block-chat.command';
import { BlockChatSocketReturn } from 'chats/chats.interface';
import { ChatsMapper } from 'chats/chats.mapper';

@CommandHandler(BlockChatCommand)
export class BlockChatCommandHandler
  implements ICommandHandler<BlockChatCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: BlockChatCommand): Promise<BlockChatSocketReturn> {
    const { user, dto } = command;

    const candidate = await this.prismaService.chat.findFirst({
      where: {
        id: dto.chatId,
        blocked: false,
        users: { some: { id: user.id } },
      },
    });
    if (!candidate) {
      throw new WsException(NOT_FOUND);
    }

    const blockedChat = await this.prismaService.chat.update({
      where: { id: dto.chatId },
      data: { blocked: true, blockedById: user.id },
      select: {
        id: true,
        users: {
          select: { id: true },
        },
        blocked: true,
        blockedById: true,
      },
    });

    return ChatsMapper.mapBlockChat(blockedChat);
  }
}
