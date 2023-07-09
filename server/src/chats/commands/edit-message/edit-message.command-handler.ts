import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from 'prisma/prisma.service';
import { EditMessageCommand } from './edit-message.command';
import { Message } from 'chats/chats.interface';
import { WsException } from '@nestjs/websockets';
import { ChatsSelector } from 'chats/chats.selector';
import { getDatesHourDiff } from 'common/helpers';
import { FORBIDDEN, NOT_FOUND } from 'common/constants/error';

@CommandHandler(EditMessageCommand)
export class EditMessageCommandHandler
  implements ICommandHandler<EditMessageCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: EditMessageCommand): Promise<Message> {
    const { user, chatId, dto } = command;

    const chat = await this.prismaService.chat.findUnique({
      where: { id: chatId },
      select: { blocked: true },
    });
    if (!chat || chat?.blocked) {
      throw new WsException(FORBIDDEN);
    }

    const candidate = await this.prismaService.message.findFirst({
      where: { id: dto.messageId, userId: user.id },
    });
    if (!candidate) {
      throw new WsException(NOT_FOUND);
    }

    const isMessageEditable =
      getDatesHourDiff(new Date(), new Date(candidate.createdAt)) < 6;
    if (!isMessageEditable) {
      throw new WsException(FORBIDDEN);
    }

    const message = await this.prismaService.message.update({
      where: { id: dto.messageId },
      data: { text: dto.text },
      select: ChatsSelector.selectMessage(),
    });

    return message;
  }
}
