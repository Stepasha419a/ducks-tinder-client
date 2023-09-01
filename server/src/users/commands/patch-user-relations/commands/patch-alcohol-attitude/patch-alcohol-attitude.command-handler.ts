import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PatchAlcoholAttitudeCommand } from './patch-alcohol-attitude.command';
import { PrismaService } from 'prisma/prisma.service';

@CommandHandler(PatchAlcoholAttitudeCommand)
export class PatchAlcoholAttitudeCommandHandler
  implements ICommandHandler<PatchAlcoholAttitudeCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: PatchAlcoholAttitudeCommand): Promise<void> {
    const { user, alcoholAttitude } = command;

    if (alcoholAttitude === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          alcoholAttitude: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.alcoholAttitude.findUnique({
      where: { name: alcoholAttitude },
    });
    if (!candidate) {
      throw new NotFoundException();
    }

    if (user.alcoholAttitude) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          alcoholAttitude: { disconnect: true },
        },
      });
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        alcoholAttitude: { connect: { name: alcoholAttitude } },
      },
    });
  }
}
