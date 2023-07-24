import { WsException } from '@nestjs/websockets';
import { PrismaService } from 'prisma/prisma.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendMessageCommand } from './send-message.command';
import { ChatsSelector } from 'chats/chats.selector';
import { ChatSocketMessageReturn } from 'chats/chats.interface';
import { FORBIDDEN, NOT_FOUND } from 'common/constants/error';

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
      throw new WsException(FORBIDDEN);
    }

    if (dto.repliedId) {
      const replied = await this.prismaService.message.findUnique({
        where: { id: dto.repliedId },
      });
      if (!replied) {
        throw new WsException(NOT_FOUND);
      }
    }

    const message = await this.prismaService.message.create({
      data: { chatId: dto.chatId, userId: user.id, ...dto },
      select: ChatsSelector.selectMessage(),
    });

    return { message, id: chat.id, users: chat.users.map((user) => user.id) };
  }
}
