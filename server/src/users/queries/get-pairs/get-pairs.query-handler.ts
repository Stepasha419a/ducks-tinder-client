import { PrismaService } from 'prisma/prisma.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPairsQuery } from './get-pairs.query';
import { ShortUser } from 'users/users.interface';
import { UsersSelector } from 'users/users.selector';
import { getDistanceFromLatLonInKm } from 'common/helpers';

@QueryHandler(GetPairsQuery)
export class GetPairsQueryHandler implements IQueryHandler<GetPairsQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetPairsQuery): Promise<ShortUser[]> {
    const { user } = query;

    const place = await this.prismaService.place.findUnique({
      where: { id: user.id },
      select: { latitude: true, longitude: true },
    });

    const pairs = (
      await this.prismaService.user.findUnique({
        where: { id: user.id },
        select: {
          pairs: {
            select: UsersSelector.selectShortUser(),
          },
        },
      })
    ).pairs;

    return pairs.map((pair) => ({
      ...pair,
      place: { name: pair.place?.name },
      distance: getDistanceFromLatLonInKm(
        place.latitude,
        place.longitude,
        pair.place?.latitude,
        pair.place?.longitude,
      ),
    }));
  }
}
