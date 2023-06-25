import { WsException } from '@nestjs/websockets';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMessageCommand } from './delete-message.command';
import { Message } from 'chats/chats.interfaces';
import { PrismaService } from 'prisma/prisma.service';
import { ChatsSelector } from 'chats/chats.selector';

@CommandHandler(DeleteMessageCommand)
export class DeleteMessageCommandHandler
  implements ICommandHandler<DeleteMessageCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: DeleteMessageCommand): Promise<Message> {
    const { user, messageId } = command;

    const message = await this.prismaService.message.findFirst({
      where: { id: messageId, userId: user.id },
      select: ChatsSelector.selectMessage(),
    });
    if (!message) {
      throw new WsException('Not found');
    }

    await this.prismaService.message.delete({ where: { id: messageId } });

    return message;
  }
}
