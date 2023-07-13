import { PrismaService } from 'prisma/prisma.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PatchUserCommand } from './patch-user.command';
import { UsersSelector } from 'users/users.selector';
import { UserDto } from 'users/dto';
import { ForbiddenException } from '@nestjs/common';
import { USER_ALREADY_EXISTS } from 'common/constants/error';

@CommandHandler(PatchUserCommand)
export class PatchUserCommandHandler
  implements ICommandHandler<PatchUserCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: PatchUserCommand): Promise<UserDto> {
    const { user, dto } = command;

    // dto without interests to update user fields (interest = relation)
    const updateUserDto = { ...dto, interests: undefined };

    if (dto.email) {
      const candidate = await this.prismaService.user.findUnique({
        where: { email: dto.email },
      });
      if (candidate) {
        throw new ForbiddenException(USER_ALREADY_EXISTS);
      }
    }

    if (dto.interests && (dto.interests.length || dto.interests.length === 0)) {
      const interests = (
        await this.prismaService.user.findUnique({
          where: { id: user.id },
          select: {
            interests: true,
          },
        })
      ).interests;
      const existingInterests = await this.prismaService.interest.findMany({
        where: { name: { in: dto.interests } },
      });
      // TODO: do this with comparison
      await Promise.all(
        interests.map(async (interest) => {
          await this.prismaService.user.update({
            where: { id: user.id },
            data: { interests: { disconnect: { id: interest.id } } },
          });
        }),
      );
      await Promise.all(
        existingInterests.map(async (interest) => {
          await this.prismaService.user.update({
            where: { id: user.id },
            data: { interests: { connect: { id: interest.id } } },
          });
        }),
      );
    }

    const pairsCount = await this.prismaService.user.count({
      where: { pairFor: { some: { id: user.id } } },
    });

    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: { ...updateUserDto },
      include: UsersSelector.selectUser(),
    });

    return new UserDto({ ...updatedUser, pairsCount });
  }
}
