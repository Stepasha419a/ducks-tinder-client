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
      distance: getDistanceFromLatLonInKm(
        user.place.latitude,
        user.place.longitude,
        pair.place?.latitude,
        pair.place?.longitude,
      ),
      place: { name: pair.place?.name },
    }));
  }
}
