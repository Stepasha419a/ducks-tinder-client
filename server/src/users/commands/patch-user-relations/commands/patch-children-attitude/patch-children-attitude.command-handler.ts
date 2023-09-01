import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PatchChildrenAttitudeCommand } from './patch-children-attitude.command';
import { PrismaService } from 'prisma/prisma.service';

@CommandHandler(PatchChildrenAttitudeCommand)
export class PatchChildrenAttitudeCommandHandler
  implements ICommandHandler<PatchChildrenAttitudeCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: PatchChildrenAttitudeCommand): Promise<void> {
    const { user, childrenAttitude } = command;

    if (childrenAttitude === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          childrenAttitude: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.childrenAttitude.findUnique({
      where: { name: childrenAttitude },
    });
    if (!candidate) {
      throw new NotFoundException();
    }

    if (user.childrenAttitude) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          childrenAttitude: { disconnect: true },
        },
      });
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        childrenAttitude: { connect: { name: childrenAttitude } },
      },
    });
  }
}
