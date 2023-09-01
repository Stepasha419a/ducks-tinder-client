import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PatchFoodPreferenceCommand } from './patch-food-preference.command';
import { PrismaService } from 'prisma/prisma.service';

@CommandHandler(PatchFoodPreferenceCommand)
export class PatchFoodPreferenceCommandHandler
  implements ICommandHandler<PatchFoodPreferenceCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: PatchFoodPreferenceCommand): Promise<void> {
    const { user, foodPreference } = command;

    if (foodPreference === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          foodPreference: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.foodPreference.findUnique({
      where: { name: foodPreference },
    });
    if (!candidate) {
      throw new NotFoundException();
    }

    if (user.foodPreference) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          foodPreference: { disconnect: true },
        },
      });
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        foodPreference: { connect: { name: foodPreference } },
      },
    });
  }
}
