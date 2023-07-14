import { PrismaService } from '../../../prisma/prisma.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReturnUserCommand } from './return-user.command';
import { NotFoundException } from '@nestjs/common';
import { UsersSelector } from 'users/users.selector';
import { getDistanceFromLatLonInKm } from 'common/helpers';
import { ShortUser } from 'users/users.interface';

@CommandHandler(ReturnUserCommand)
export class ReturnUserCommandHandler
  implements ICommandHandler<ReturnUserCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: ReturnUserCommand): Promise<ShortUser> {
    const { user } = command;

    const pairIds = (
      await this.prismaService.user.findUnique({
        where: { id: user.id },
        select: { pairFor: { select: { id: true } } },
      })
    ).pairFor.map((pair) => pair.id);

    const checkedUser = await this.prismaService.checkedUsers.findFirst({
      where: {
        wasCheckedId: user.id,
        checked: { id: { notIn: pairIds } },
      },
      orderBy: { createdAt: 'desc' },
    });
    if (!checkedUser) {
      throw new NotFoundException();
    }

    await this.prismaService.checkedUsers.delete({
      where: {
        checkedId_wasCheckedId: {
          checkedId: checkedUser.checkedId,
          wasCheckedId: checkedUser.wasCheckedId,
        },
      },
    });

    const sortedUser = await this.prismaService.user.findUnique({
      where: { id: checkedUser.checkedId },
      select: UsersSelector.selectShortUser(),
    });

    const distance = getDistanceFromLatLonInKm(
      user.place.latitude,
      user.place.longitude,
      sortedUser.place.latitude,
      sortedUser.place.longitude,
    );

    return {
      ...sortedUser,
      distance: distance,
      place: { name: sortedUser.place.name },
    };
  }
}
