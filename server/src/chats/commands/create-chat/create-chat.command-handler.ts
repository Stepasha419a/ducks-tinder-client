import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateChatCommand } from './create-chat.command';
import { PrismaService } from 'prisma/prisma.service';

@CommandHandler(CreateChatCommand)
export class CreateChatCommandHandler
  implements ICommandHandler<CreateChatCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: CreateChatCommand): Promise<void> {
    const { memberIds } = command;

    const chatCandidate = await this.prismaService.chat.findFirst({
      where: { users: { every: { id: { in: memberIds } } } },
    });
    if (chatCandidate) {
      throw new BadRequestException('Chat already exists');
    }

    await this.prismaService.chat.create({
      data: {
        users: {
          connect: memberIds.map((id) => ({
            id,
          })),
        },
      },
    });
  }
}
