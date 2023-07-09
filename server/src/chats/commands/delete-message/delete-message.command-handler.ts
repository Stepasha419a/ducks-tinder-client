import { WsException } from '@nestjs/websockets';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMessageCommand } from './delete-message.command';
import { Message } from 'chats/chats.interface';
import { PrismaService } from 'prisma/prisma.service';
import { ChatsSelector } from 'chats/chats.selector';
import { getDatesHourDiff } from 'common/helpers';
import { FORBIDDEN, NOT_FOUND } from 'common/constants/error';

@CommandHandler(DeleteMessageCommand)
export class DeleteMessageCommandHandler
  implements ICommandHandler<DeleteMessageCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: DeleteMessageCommand): Promise<Message> {
    const { user, chatId, dto } = command;

    const chat = await this.prismaService.chat.findUnique({
      where: { id: chatId },
      select: { blocked: true },
    });
    if (!chat || chat?.blocked) {
      throw new WsException(FORBIDDEN);
    }

    const message = await this.prismaService.message.findFirst({
      where: { id: dto.messageId, userId: user.id },
      select: ChatsSelector.selectMessage(),
    });
    if (!message) {
      throw new WsException(NOT_FOUND);
    }

    const isMessageDeletable =
      getDatesHourDiff(new Date(), new Date(message.createdAt)) < 12;
    if (!isMessageDeletable) {
      throw new WsException(FORBIDDEN);
    }

    await this.prismaService.message.delete({ where: { id: dto.messageId } });

    return message;
  }
}
