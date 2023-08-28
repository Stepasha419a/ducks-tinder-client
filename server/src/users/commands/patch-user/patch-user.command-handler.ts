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

    if (dto.email) {
      const candidate = await this.prismaService.user.findUnique({
        where: { email: dto.email },
      });
      if (candidate) {
        throw new ForbiddenException(USER_ALREADY_EXISTS);
      }
    }

    const pairsCount = await this.prismaService.user.count({
      where: { pairFor: { some: { id: user.id } } },
    });

    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: dto,
      include: UsersSelector.selectUser(),
    });

    return new UserDto({ ...updatedUser, pairsCount });
  }
}
