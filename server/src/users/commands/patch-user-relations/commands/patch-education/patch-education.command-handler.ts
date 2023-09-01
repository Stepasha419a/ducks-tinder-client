import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PatchEducationCommand } from './patch-education.command';
import { PrismaService } from 'prisma/prisma.service';

@CommandHandler(PatchEducationCommand)
export class PatchEducationCommandHandler
  implements ICommandHandler<PatchEducationCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: PatchEducationCommand): Promise<void> {
    const { user, education } = command;

    if (education === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          education: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.education.findUnique({
      where: { name: education },
    });
    if (!candidate) {
      throw new NotFoundException();
    }

    if (user.education) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          education: { disconnect: true },
        },
      });
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        education: { connect: { name: education } },
      },
    });
  }
}
