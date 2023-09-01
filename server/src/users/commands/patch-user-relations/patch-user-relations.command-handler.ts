import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PatchUserRelationsCommand } from './patch-user-relations.command';
import { NotValidatedUserDto, PatchUserRelationsDto, UserDto } from 'users/dto';
import { PrismaService } from 'prisma/prisma.service';
import { UsersSelector } from 'users/users.selector';
import {
  PatchAlcoholAttitudeCommand,
  PatchAttentionSignCommand,
  PatchChildrenAttitudeCommand,
  PatchChronotypeCommand,
  PatchCommunicationStyleCommand,
  PatchEducationCommand,
  PatchFoodPreferenceCommand,
  PatchInterestsCommand,
  PatchPersonalityTypeCommand,
  PatchPetCommand,
  PatchSmokingAttitudeCommand,
  PatchSocialNetworksActivityCommand,
  PatchTrainingAttitudeCommand,
  PatchZodiacSignCommand,
} from './commands';

@CommandHandler(PatchUserRelationsCommand)
export class PatchUserRelationsHandlerCommand
  implements ICommandHandler<PatchUserRelationsCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: PatchUserRelationsCommand): Promise<UserDto> {
    const { user, dto } = command;

    await this.updateRelations(user, dto);

    const pairsCount = await this.prismaService.user.count({
      where: { pairFor: { some: { id: user.id } } },
    });

    const updatedUser = await this.prismaService.user.findUnique({
      where: { id: user.id },
      include: UsersSelector.selectUser(),
    });

    return new UserDto({ ...updatedUser, pairsCount });
  }

  private async updateRelations(
    user: NotValidatedUserDto,
    dto: PatchUserRelationsDto,
  ) {
    if (dto.interests || dto.interests?.length === 0) {
      await this.commandBus.execute(
        new PatchInterestsCommand(user, dto.interests),
      );
    }
    if (this.needsUpdate(dto.attentionSign)) {
      await this.commandBus.execute(
        new PatchAttentionSignCommand(user, dto.attentionSign),
      );
    }
    if (this.needsUpdate(dto.childrenAttitude)) {
      await this.commandBus.execute(
        new PatchChildrenAttitudeCommand(user, dto.childrenAttitude),
      );
    }
    if (this.needsUpdate(dto.communicationStyle)) {
      await this.commandBus.execute(
        new PatchCommunicationStyleCommand(user, dto.communicationStyle),
      );
    }
    if (this.needsUpdate(dto.education)) {
      await this.commandBus.execute(
        new PatchEducationCommand(user, dto.education),
      );
    }
    if (this.needsUpdate(dto.personalityType)) {
      await this.commandBus.execute(
        new PatchPersonalityTypeCommand(user, dto.personalityType),
      );
    }
    if (this.needsUpdate(dto.zodiacSign)) {
      await this.commandBus.execute(
        new PatchZodiacSignCommand(user, dto.zodiacSign),
      );
    }
    if (this.needsUpdate(dto.alcoholAttitude)) {
      await this.commandBus.execute(
        new PatchAlcoholAttitudeCommand(user, dto.alcoholAttitude),
      );
    }
    if (this.needsUpdate(dto.chronotype)) {
      await this.commandBus.execute(
        new PatchChronotypeCommand(user, dto.chronotype),
      );
    }
    if (this.needsUpdate(dto.foodPreference)) {
      await this.commandBus.execute(
        new PatchFoodPreferenceCommand(user, dto.foodPreference),
      );
    }
    if (this.needsUpdate(dto.pet)) {
      await this.commandBus.execute(new PatchPetCommand(user, dto.pet));
    }
    if (this.needsUpdate(dto.smokingAttitude)) {
      await this.commandBus.execute(
        new PatchSmokingAttitudeCommand(user, dto.smokingAttitude),
      );
    }
    if (this.needsUpdate(dto.socialNetworksActivity)) {
      await this.commandBus.execute(
        new PatchSocialNetworksActivityCommand(
          user,
          dto.socialNetworksActivity,
        ),
      );
    }
    if (this.needsUpdate(dto.trainingAttitude)) {
      await this.commandBus.execute(
        new PatchTrainingAttitudeCommand(user, dto.trainingAttitude),
      );
    }
  }

  private needsUpdate(settingField?: string): boolean {
    return Boolean(settingField || settingField === null);
  }
}
