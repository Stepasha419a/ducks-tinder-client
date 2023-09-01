import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PatchCommunicationStyleCommand } from './patch-communication-style.command';
import { PrismaService } from 'prisma/prisma.service';

@CommandHandler(PatchCommunicationStyleCommand)
export class PatchCommunicationStyleCommandHandler
  implements ICommandHandler<PatchCommunicationStyleCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: PatchCommunicationStyleCommand): Promise<void> {
    const { user, communicationStyle } = command;

    if (communicationStyle === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          communicationStyle: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.communicationStyle.findUnique({
      where: { name: communicationStyle },
    });
    if (!candidate) {
      throw new NotFoundException();
    }

    if (user.communicationStyle) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          communicationStyle: { disconnect: true },
        },
      });
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        communicationStyle: { connect: { name: communicationStyle } },
      },
    });
  }
}
