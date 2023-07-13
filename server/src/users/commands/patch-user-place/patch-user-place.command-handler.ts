import { MapsService } from './../../../maps/maps.service';
import { PrismaService } from 'prisma/prisma.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserDto } from 'users/dto';
import { UsersSelector } from 'users/users.selector';
import { PatchUserPlaceCommand } from './patch-user-place.command';

@CommandHandler(PatchUserPlaceCommand)
export class PatchUserPlaceCommandHandler
  implements ICommandHandler<PatchUserPlaceCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mapsService: MapsService,
  ) {}

  /* idk how it works but browser maps api returns lat and long but geocode api requires
   them on the contrary for correct geocode answer & distance formula requires them on the
   contrary => I swap them when save in db */
  async execute(command: PatchUserPlaceCommand): Promise<UserDto> {
    const { user, dto } = command;

    const geocode = await this.mapsService.getCoordsGeocode(
      dto.latitude,
      dto.longitude,
    );

    await this.prismaService.place.upsert({
      where: { id: user.id },
      create: {
        latitude: dto.longitude,
        longitude: dto.latitude,
        address: geocode.address,
        name: geocode.name,
        user: { connect: { id: user.id } },
      },
      update: {
        latitude: dto.longitude,
        longitude: dto.latitude,
        address: geocode.address,
        name: geocode.name,
      },
    });

    const pairsCount = await this.prismaService.user.count({
      where: { pairFor: { some: { id: user.id } } },
    });

    const updatedUser = await this.prismaService.user.findUnique({
      where: { id: user.id },
      include: UsersSelector.selectUser(),
    });

    return new UserDto({ ...updatedUser, pairsCount });
  }
}
