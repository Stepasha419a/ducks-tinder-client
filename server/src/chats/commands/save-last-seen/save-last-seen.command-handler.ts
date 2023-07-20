import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SaveLastSeenCommand } from './save-last-seen.command';
import { PrismaService } from 'prisma/prisma.service';

@CommandHandler(SaveLastSeenCommand)
export class SaveLastSeenCommandHandler
  implements ICommandHandler<SaveLastSeenCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: SaveLastSeenCommand): Promise<void> {
    const { user, chatId } = command;

    await this.prismaService.chatVisit.upsert({
      where: { userId_chatId: { userId: user.id, chatId } },
      create: { lastSeen: new Date().toISOString(), userId: user.id, chatId },
      update: { lastSeen: new Date().toISOString() },
    });
  }
}
