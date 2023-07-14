import { PrismaService } from 'prisma/prisma.service';
import { PatchUserPlaceCommandHandler } from './patch-user-place.command-handler';
import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { MapsModule } from 'maps/maps.module';
import { MapsServiceMock, UsersPrismaMock } from 'users/test/mocks';
import { MapsService } from 'maps/maps.service';
import { PatchUserPlaceDto, UserDto } from 'users/dto';
import { PatchUserPlaceCommand } from './patch-user-place.command';
import { requestUserStub, userDtoStub } from 'users/test/stubs';
import { UsersSelector } from 'users/users.selector';
import { ConfigModule } from '@nestjs/config';
describe('when patch user place is called', () => {
  let patchUserPlaceCommandHandler: PatchUserPlaceCommandHandler;
  let prismaService: PrismaService;
  let mapsService: MapsService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PatchUserPlaceCommandHandler],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        PrismaModule,
        MapsModule,
      ],
    })
      .overrideProvider(PrismaModule)
      .useValue(UsersPrismaMock())
      .overrideProvider(MapsService)
      .useValue(MapsServiceMock())
      .compile();

    patchUserPlaceCommandHandler = moduleRef.get<PatchUserPlaceCommandHandler>(
      PatchUserPlaceCommandHandler,
    );
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    mapsService = moduleRef.get<MapsService>(MapsService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      mapsService.getCoordsGeocode = jest.fn().mockResolvedValue({
        address: 'address-geocode',
        name: 'name-geocode',
      });
      prismaService.place.upsert = jest.fn().mockResolvedValue(undefined);
      prismaService.user.count = jest.fn().mockResolvedValue(5);
      prismaService.user.findUnique = jest.fn().mockResolvedValue({
        ...userDtoStub(),
        pairs: [userDtoStub().firstPair],
      });
    });

    let response: UserDto;
    const dto: PatchUserPlaceDto = {
      latitude: 12.3456789,
      longitude: 12.3456789,
    };

    beforeEach(async () => {
      response = await patchUserPlaceCommandHandler.execute(
        new PatchUserPlaceCommand(requestUserStub(), dto),
      );
    });

    it('should call mapsService get coords geocode', () => {
      expect(mapsService.getCoordsGeocode).toBeCalledTimes(1);
      expect(mapsService.getCoordsGeocode).toBeCalledWith(
        dto.latitude,
        dto.longitude,
      );
    });

    it('should call place upsert', () => {
      expect(prismaService.place.upsert).toBeCalledTimes(1);
      expect(prismaService.place.upsert).toBeCalledWith({
        where: { id: requestUserStub().id },
        create: {
          latitude: dto.longitude,
          longitude: dto.latitude,
          address: 'address-geocode',
          name: 'name-geocode',
          user: { connect: { id: requestUserStub().id } },
        },
        update: {
          latitude: dto.longitude,
          longitude: dto.latitude,
          address: 'address-geocode',
          name: 'name-geocode',
        },
      });
    });

    it('should call user count', () => {
      expect(prismaService.user.count).toBeCalledTimes(1);
      expect(prismaService.user.count).toBeCalledWith({
        where: { pairFor: { some: { id: requestUserStub().id } } },
      });
    });

    it('should call user find unique', () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toBeCalledWith({
        where: { id: requestUserStub().id },
        include: UsersSelector.selectUser(),
      });
    });

    it('should return user', () => {
      expect(response).toEqual(userDtoStub());
    });
  });
});
