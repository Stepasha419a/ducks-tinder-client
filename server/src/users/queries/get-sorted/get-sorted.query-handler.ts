import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from 'prisma/prisma.service';
import { GetSortedQuery } from './get-sorted.query';
import { ShortUser } from 'users/users.interface';
import { UsersSelector } from 'users/users.selector';
import { NotFoundException } from '@nestjs/common';
import { getDistanceFromLatLonInKm, getSearchingCoords } from 'common/helpers';

@QueryHandler(GetSortedQuery)
export class GetSortedQueryHandler implements IQueryHandler<GetSortedQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetSortedQuery): Promise<ShortUser> {
    const { user } = query;

    const checkedUsers = await this.prismaService.checkedUsers.findMany({
      where: { OR: [{ checkedId: user.id }, { wasCheckedId: user.id }] },
      select: {
        checked: { select: { id: true } },
        wasChecked: { select: { id: true } },
      },
    });
    const checkedIds = checkedUsers.map((user) => user.checked.id);
    const wasCheckedIds = checkedUsers.map((user) => user.wasChecked.id);

    const userDistance = user.usersOnlyInDistance ? user.distance : 150;
    const { maxLatitude, minLatitude, maxLongitude, minLongitude } =
      getSearchingCoords(
        user.place.latitude,
        user.place.longitude,
        userDistance,
      );

    const sortedUser = await this.prismaService.user.findFirst({
      where: {
        id: { notIn: [...checkedIds, ...wasCheckedIds] },
        place: {
          latitude: { gte: minLatitude, lte: maxLatitude },
          longitude: { gte: minLongitude, lte: maxLongitude },
        },
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
