import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PatchPersonalityTypeCommand } from './patch-personality-type.command';
import { PrismaService } from 'prisma/prisma.service';

@CommandHandler(PatchPersonalityTypeCommand)
export class PatchPersonalityTypeCommandHandler
  implements ICommandHandler<PatchPersonalityTypeCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: PatchPersonalityTypeCommand): Promise<void> {
    const { user, personalityType } = command;

    if (personalityType === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          personalityType: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.personalityType.findUnique({
      where: { name: personalityType },
    });
    if (!candidate) {
      throw new NotFoundException();
    }

    if (user.personalityType) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          personalityType: { disconnect: true },
        },
      });
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        personalityType: { connect: { name: personalityType } },
      },
    });
  }
}
