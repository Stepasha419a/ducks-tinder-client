import { PrismaService } from 'prisma/prisma.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendMessageCommand } from './send-message.command';
import { Message } from '@prisma/client';

@CommandHandler(SendMessageCommand)
export class SendMessageCommandHandler
  implements ICommandHandler<SendMessageCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: SendMessageCommand): Promise<Message> {
    const { user, dto } = command;

    return this.prismaService.message.create({
      data: { ...dto, userId: user.id },
    });
  }
}
