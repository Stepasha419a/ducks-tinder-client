import { WsException } from '@nestjs/websockets';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from 'prisma/prisma.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendMessageCommand } from './send-message.command';
import { ChatsSelector } from 'chats/chats.selector';
import { Message } from 'chats/chats.interface';
import { FORBIDDEN, NOT_FOUND } from 'common/constants/error';

@CommandHandler(SendMessageCommand)
export class SendMessageCommandHandler
  implements ICommandHandler<SendMessageCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(command: SendMessageCommand): Promise<Message> {
    const { user, chatId, dto } = command;

    const chat = await this.prismaService.chat.findUnique({
      where: { id: chatId },
      select: { blocked: true, users: { select: { id: true } } },
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
      data: { chatId, userId: user.id, ...dto },
      select: ChatsSelector.selectMessage(),
    });

    this.eventEmitter.emit('new-message', {
      message,
      chatId,
      userIds: chat.users.map((user) => user.id),
    });

    return message;
  }
}
