import { WsException } from '@nestjs/websockets';
import { PrismaService } from 'prisma/prisma.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteChatCommand } from './delete-chat.command';
import { NOT_FOUND } from 'common/constants/error';
import { ChatSocketReturn } from 'chats/chats.interface';
import { ChatsMapper } from 'chats/chats.mapper';

@CommandHandler(DeleteChatCommand)
export class DeleteChatCommandHandler
  implements ICommandHandler<DeleteChatCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: DeleteChatCommand): Promise<ChatSocketReturn> {
    const { user, chatId } = command;

    const candidate = await this.prismaService.chat.findFirst({
      where: { id: chatId, users: { some: { id: user.id } } },
    });
    if (!candidate) {
      throw new WsException(NOT_FOUND);
    }

    await this.prismaService.chatVisit.deleteMany({
      where: { chatId: candidate.id },
    });

    const deletedChat = await this.prismaService.chat.delete({
      where: { id: candidate.id },
      select: { users: { select: { id: true } }, id: true },
    });

    return ChatsMapper.mapChat(deletedChat);
  }
}
