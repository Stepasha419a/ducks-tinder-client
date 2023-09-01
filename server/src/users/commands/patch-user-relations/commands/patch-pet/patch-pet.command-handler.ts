import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PatchPetCommand } from './patch-pet.command';
import { PrismaService } from 'prisma/prisma.service';

@CommandHandler(PatchPetCommand)
export class PatchPetCommandHandler
  implements ICommandHandler<PatchPetCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: PatchPetCommand): Promise<void> {
    const { user, pet } = command;

    if (pet === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          pet: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.pet.findUnique({
      where: { name: pet },
    });
    if (!candidate) {
      throw new NotFoundException();
    }

    if (user.pet) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          pet: { disconnect: true },
        },
      });
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        pet: { connect: { name: pet } },
      },
    });
  }
}
