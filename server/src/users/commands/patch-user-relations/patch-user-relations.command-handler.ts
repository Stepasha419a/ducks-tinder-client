import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PatchUserRelationsCommand } from './patch-user-relations.command';
import { NotValidatedUserDto, PatchUserRelationsDto, UserDto } from 'users/dto';
import { PrismaService } from 'prisma/prisma.service';
import { compareUserRelationFieldIds } from './helpers';
import { UsersSelector } from 'users/users.selector';

@CommandHandler(PatchUserRelationsCommand)
export class PatchUserRelationsHandlerCommand
  implements ICommandHandler<PatchUserRelationsCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: PatchUserRelationsCommand): Promise<UserDto> {
    const { user, dto } = command;

    if (dto.interests || dto.interests?.length === 0) {
      await this.updateInterests(user, dto);
    }
    if (this.needsUpdate(dto.attentionSign)) {
      await this.updateAttentionSign(user, dto);
    }
    if (this.needsUpdate(dto.childrenAttitude)) {
      await this.updateChildrenAttitude(user, dto);
    }
    if (this.needsUpdate(dto.communicationStyle)) {
      await this.updateCommunicationStyle(user, dto);
    }
    if (this.needsUpdate(dto.education)) {
      await this.updateEducation(user, dto);
    }
    if (this.needsUpdate(dto.personalityType)) {
      await this.updatePersonalityType(user, dto);
    }
    if (this.needsUpdate(dto.zodiacSign)) {
      await this.updateZodiacSign(user, dto);
    }
    if (this.needsUpdate(dto.alcoholAttitude)) {
      await this.updateAlcoholAttitude(user, dto);
    }
    if (this.needsUpdate(dto.chronotype)) {
      await this.updateChronotype(user, dto);
    }
    if (this.needsUpdate(dto.foodPreference)) {
      await this.updateFoodPreference(user, dto);
    }
    if (this.needsUpdate(dto.pet)) {
      await this.updatePet(user, dto);
    }
    if (this.needsUpdate(dto.smokingAttitude)) {
      await this.updateSmokingAttitude(user, dto);
    }
    if (this.needsUpdate(dto.socialNetworksActivity)) {
      await this.updateSocialNetworksActivity(user, dto);
    }
    if (this.needsUpdate(dto.trainingAttitude)) {
      await this.updateTrainingAttitude(user, dto);
    }

    const pairsCount = await this.prismaService.user.count({
      where: { pairFor: { some: { id: user.id } } },
    });

    const updatedUser = await this.prismaService.user.findUnique({
      where: { id: user.id },
      include: UsersSelector.selectUser(),
    });

    return new UserDto({ ...updatedUser, pairsCount });
  }

  private needsUpdate(settingField?: string): boolean {
    return Boolean(settingField || settingField === null);
  }

  private async updateInterests(
    user: NotValidatedUserDto,
    dto: PatchUserRelationsDto,
  ) {
    const interestIds = await this.prismaService.interest.findMany({
      where: { users: { some: { id: user.id } } },
      select: { id: true },
    });
    const updatedInterestIds = await this.prismaService.interest.findMany({
      where: { name: { in: dto.interests } },
      select: { id: true },
    });

    const { toConnect, toDisconnect } = compareUserRelationFieldIds(
      interestIds,
      updatedInterestIds,
    );

    if (toConnect.length) {
      await this.prismaService.$transaction(
        toConnect.map((field) =>
          this.prismaService.user.update({
            where: { id: user.id },
            data: { interests: { connect: { id: field.id } } },
          }),
        ),
      );
    }
    if (toDisconnect.length) {
      await this.prismaService.$transaction(
        toDisconnect.map((field) =>
          this.prismaService.user.update({
            where: { id: user.id },
            data: { interests: { disconnect: { id: field.id } } },
          }),
        ),
      );
    }
  }

  private async updateAttentionSign(
    user: NotValidatedUserDto,
    dto: PatchUserRelationsDto,
  ) {
    if (dto.attentionSign === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          attentionSign: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.attentionSign.findUnique({
      where: { name: dto.attentionSign },
    });
    if (!candidate) {
      throw new NotFoundException();
    }

    if (user.attentionSign) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          attentionSign: { disconnect: true },
        },
      });
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        attentionSign: { connect: { name: dto.attentionSign } },
      },
    });
  }

  private async updateChildrenAttitude(
    user: NotValidatedUserDto,
    dto: PatchUserRelationsDto,
  ) {
    if (dto.childrenAttitude === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          childrenAttitude: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.childrenAttitude.findUnique({
      where: { name: dto.childrenAttitude },
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
        childrenAttitude: { connect: { name: dto.childrenAttitude } },
      },
    });
  }

  private async updateCommunicationStyle(
    user: NotValidatedUserDto,
    dto: PatchUserRelationsDto,
  ) {
    if (dto.communicationStyle === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          communicationStyle: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.communicationStyle.findUnique({
      where: { name: dto.communicationStyle },
    });
    if (!candidate) {
      throw new NotFoundException();
    }

    if (user.communicationStyle) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          communicationStyle: { disconnect: true },
        },
      });
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        communicationStyle: { connect: { name: dto.communicationStyle } },
      },
    });
  }

  private async updateEducation(
    user: NotValidatedUserDto,
    dto: PatchUserRelationsDto,
  ) {
    if (dto.education === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          education: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.education.findUnique({
      where: { name: dto.education },
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
        education: { connect: { name: dto.education } },
      },
    });
  }

  private async updatePersonalityType(
    user: NotValidatedUserDto,
    dto: PatchUserRelationsDto,
  ) {
    if (dto.personalityType === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          personalityType: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.personalityType.findUnique({
      where: { name: dto.personalityType },
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
        personalityType: { connect: { name: dto.personalityType } },
      },
    });
  }

  private async updateZodiacSign(
    user: NotValidatedUserDto,
    dto: PatchUserRelationsDto,
  ) {
    if (dto.zodiacSign === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          zodiacSign: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.zodiacSign.findUnique({
      where: { name: dto.zodiacSign },
    });
    if (!candidate) {
      throw new NotFoundException();
    }

    if (user.zodiacSign) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          zodiacSign: { disconnect: true },
        },
      });
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        zodiacSign: { connect: { name: dto.zodiacSign } },
      },
    });
  }

  private async updateAlcoholAttitude(
    user: NotValidatedUserDto,
    dto: PatchUserRelationsDto,
  ) {
    if (dto.alcoholAttitude === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          alcoholAttitude: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.alcoholAttitude.findUnique({
      where: { name: dto.alcoholAttitude },
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
        alcoholAttitude: { connect: { name: dto.alcoholAttitude } },
      },
    });
  }

  private async updateChronotype(
    user: NotValidatedUserDto,
    dto: PatchUserRelationsDto,
  ) {
    if (dto.chronotype === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          chronotype: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.chronotype.findUnique({
      where: { name: dto.chronotype },
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
        chronotype: { connect: { name: dto.chronotype } },
      },
    });
  }

  private async updateFoodPreference(
    user: NotValidatedUserDto,
    dto: PatchUserRelationsDto,
  ) {
    if (dto.foodPreference === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          foodPreference: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.foodPreference.findUnique({
      where: { name: dto.foodPreference },
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
        foodPreference: { connect: { name: dto.foodPreference } },
      },
    });
  }

  private async updatePet(
    user: NotValidatedUserDto,
    dto: PatchUserRelationsDto,
  ) {
    if (dto.pet === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          pet: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.pet.findUnique({
      where: { name: dto.pet },
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
        pet: { connect: { name: dto.pet } },
      },
    });
  }

  private async updateSmokingAttitude(
    user: NotValidatedUserDto,
    dto: PatchUserRelationsDto,
  ) {
    if (dto.smokingAttitude === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          smokingAttitude: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.smokingAttitude.findUnique({
      where: { name: dto.smokingAttitude },
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
        smokingAttitude: { connect: { name: dto.smokingAttitude } },
      },
    });
  }

  private async updateSocialNetworksActivity(
    user: NotValidatedUserDto,
    dto: PatchUserRelationsDto,
  ) {
    if (dto.socialNetworksActivity === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          socialNetworksActivity: { disconnect: true },
        },
      });

      return;
    }

    const candidate =
      await this.prismaService.socialNetworksActivity.findUnique({
        where: { name: dto.socialNetworksActivity },
      });
    if (!candidate) {
      throw new NotFoundException();
    }

    if (user.socialNetworksActivity) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          socialNetworksActivity: { disconnect: true },
        },
      });
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        socialNetworksActivity: {
          connect: { name: dto.socialNetworksActivity },
        },
      },
    });
  }

  private async updateTrainingAttitude(
    user: NotValidatedUserDto,
    dto: PatchUserRelationsDto,
  ) {
    if (dto.trainingAttitude === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          trainingAttitude: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.trainingAttitude.findUnique({
      where: { name: dto.trainingAttitude },
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
        trainingAttitude: {
          connect: { name: dto.trainingAttitude },
        },
      },
    });
  }
}
