import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PatchTrainingAttitudeCommand } from './patch-training-attitude.command';
import { PrismaService } from 'prisma/prisma.service';

@CommandHandler(PatchTrainingAttitudeCommand)
export class PatchTrainingAttitudeCommandHandler
  implements ICommandHandler<PatchTrainingAttitudeCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: PatchTrainingAttitudeCommand): Promise<void> {
    const { user, trainingAttitude } = command;

    if (trainingAttitude === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          trainingAttitude: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.trainingAttitude.findUnique({
      where: { name: trainingAttitude },
    });
    if (!candidate) {
      throw new NotFoundException();
    }

    if (user.trainingAttitude) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          trainingAttitude: { disconnect: true },
        },
      });
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        trainingAttitude: { connect: { name: trainingAttitude } },
      },
    });
  }
}
