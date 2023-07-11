import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from 'prisma/prisma.service';
import { GetSortedQuery } from './get-sorted.query';
import { ShortUser } from 'users/users.interface';
import { UsersSelector } from 'users/users.selector';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UserDto } from 'users/dto';
import { getDistanceFromLatLonInKm } from 'common/helpers';

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

    const place = await this.prismaService.place.findUnique({
      where: { id: user.id },
      select: { latitude: true, longitude: true },
    });
    if (!place) {
      throw new BadRequestException();
    }

    const km = 0.009009;
    const maxLatitude = place.latitude + (km * user.distance) / 2;
    const minLatitude = place.latitude - (km * user.distance) / 2;
    const maxLongitude = place.longitude + (km * user.distance) / 2;
    const minLongitude = place.longitude - (km * user.distance) / 2;

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
      place.latitude,
      place.longitude,
      sortedUser.place.latitude,
      sortedUser.place.longitude,
    );

    return new UserDto({
      ...sortedUser,
      distance: distance,
    });
  }
}
