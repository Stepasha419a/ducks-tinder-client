import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from 'prisma/prisma.service';
import { GetSortedCommand } from './get-sorted.command';
import { ShortUser } from 'users/users.interface';
import { UsersSelector } from 'users/users.selector';
import { NotFoundException } from '@nestjs/common';
import { UserDto } from 'users/dto';

@CommandHandler(GetSortedCommand)
export class GetSortedHandler implements ICommandHandler<GetSortedCommand> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: GetSortedCommand): Promise<ShortUser> {
    const { user } = command;

    const checkedUsers = await this.prismaService.checkedUsers.findMany({
      where: { OR: [{ checkedId: user.id }, { wasCheckedId: user.id }] },
      select: {
        checked: { select: { id: true } },
        wasChecked: { select: { id: true } },
      },
    });
    const checkedIds = checkedUsers.map((user) => user.checked.id);
    const wasCheckedIds = checkedUsers.map((user) => user.wasChecked.id);

    const sortedUser = await this.prismaService.user.findFirst({
      where: {
        id: { notIn: [...checkedIds, ...wasCheckedIds] },
        distance: { gt: 0, lte: user.distance },
        age: {
          gte: user.preferAgeFrom,
          lte: user.preferAgeTo,
        },
        preferAgeFrom: {
          lte: user.age,
        },
        preferAgeTo: {
          gte: user.age,
        },
        sex: user.preferSex,
        preferSex: user.sex,
      },
      select: UsersSelector.selectShortUser(),
    });

    if (!sortedUser) {
      throw new NotFoundException(
        'Such user was not found, try to change settings',
      );
    }

    return new UserDto(sortedUser);
  }
}
