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
    if (this.needsUpdate(dto.zodiacSign) || dto.attentionSign === null) {
      await this.updateZodiacSign(user, dto);
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
    if (user.attentionSign) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          attentionSign: { disconnect: true },
        },
      });
    }

    if (dto.attentionSign === null) {
      return;
    }

    const candidate = await this.prismaService.attentionSign.findUnique({
      where: { name: dto.attentionSign },
    });
    if (!candidate) {
      throw new NotFoundException();
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
    if (user.childrenAttitude) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          childrenAttitude: { disconnect: true },
        },
      });
    }

    if (dto.childrenAttitude === null) {
      return;
    }

    const candidate = await this.prismaService.childrenAttitude.findUnique({
      where: { name: dto.childrenAttitude },
    });
    if (!candidate) {
      throw new NotFoundException();
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
    if (user.communicationStyle) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          communicationStyle: { disconnect: true },
        },
      });
    }

    if (dto.communicationStyle === null) {
      return;
    }

    const candidate = await this.prismaService.communicationStyle.findUnique({
      where: { name: dto.communicationStyle },
    });
    if (!candidate) {
      throw new NotFoundException();
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
    if (user.education) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          education: { disconnect: true },
        },
      });
    }

    if (dto.education === null) {
      return;
    }

    const candidate = await this.prismaService.education.findUnique({
      where: { name: dto.education },
    });
    if (!candidate) {
      throw new NotFoundException();
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
    if (user.personalityType) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          personalityType: { disconnect: true },
        },
      });
    }

    if (dto.personalityType === null) {
      return;
    }

    const candidate = await this.prismaService.personalityType.findUnique({
      where: { name: dto.personalityType },
    });
    if (!candidate) {
      throw new NotFoundException();
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
    if (user.zodiacSign) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          zodiacSign: { disconnect: true },
        },
      });
    }

    if (dto.zodiacSign === null) {
      return;
    }

    const candidate = await this.prismaService.zodiacSign.findUnique({
      where: { name: dto.zodiacSign },
    });
    if (!candidate) {
      throw new NotFoundException();
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        zodiacSign: { connect: { name: dto.zodiacSign } },
      },
    });
  }
}
