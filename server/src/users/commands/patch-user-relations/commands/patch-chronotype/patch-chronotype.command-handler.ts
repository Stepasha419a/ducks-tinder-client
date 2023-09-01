import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PatchChronotypeCommand } from './patch-chronotype.command';
import { PrismaService } from 'prisma/prisma.service';

@CommandHandler(PatchChronotypeCommand)
export class PatchChronotypeCommandHandler
  implements ICommandHandler<PatchChronotypeCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: PatchChronotypeCommand): Promise<void> {
    const { user, chronotype } = command;

    if (chronotype === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          chronotype: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.chronotype.findUnique({
      where: { name: chronotype },
    });
    if (!candidate) {
      throw new NotFoundException();
    }

    if (user.chronotype) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          chronotype: { disconnect: true },
        },
      });
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        chronotype: { connect: { name: chronotype } },
      },
    });
  }
}
