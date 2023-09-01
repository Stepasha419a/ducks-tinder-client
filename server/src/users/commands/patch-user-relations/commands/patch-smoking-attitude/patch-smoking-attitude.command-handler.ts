import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PatchSmokingAttitudeCommand } from './patch-smoking-attitude.command';
import { PrismaService } from 'prisma/prisma.service';

@CommandHandler(PatchSmokingAttitudeCommand)
export class PatchSmokingAttitudeCommandHandler
  implements ICommandHandler<PatchSmokingAttitudeCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: PatchSmokingAttitudeCommand): Promise<void> {
    const { user, smokingAttitude } = command;

    if (smokingAttitude === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          smokingAttitude: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.smokingAttitude.findUnique({
      where: { name: smokingAttitude },
    });
    if (!candidate) {
      throw new NotFoundException();
    }

    if (user.smokingAttitude) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          smokingAttitude: { disconnect: true },
        },
      });
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        smokingAttitude: { connect: { name: smokingAttitude } },
      },
    });
  }
}
