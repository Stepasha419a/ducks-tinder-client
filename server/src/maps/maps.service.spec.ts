import { GetCoordsGeocodeQuery } from './queries/get-coords-geocode/get-coords-geocode.query';
import { Test, TestingModule } from '@nestjs/testing';
import { MapsService } from './maps.service';
import { CqrsModule, QueryBus } from '@nestjs/cqrs';
import { Geocode } from './maps.interface';
import { QueryBusMock } from './test/mocks';

describe('MapsService', () => {
  let service: MapsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [MapsService],
    })
      .overrideProvider(QueryBus)
      .useValue(QueryBusMock())
      .compile();

    service = module.get<MapsService>(MapsService);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when get coords geocode is called', () => {
    let geocode: Geocode;
    const latitude = 12.123123;
    const longitude = 34.345345;
    const geocodeResponse = {
      address: 'address',
      name: 'name',
    };

    beforeAll(() => {
      queryBus.execute = jest.fn().mockResolvedValue(geocodeResponse);
    });

    beforeEach(async () => {
      geocode = await service.getCoordsGeocode(latitude, longitude);
    });

    it('should call query bus execute', () => {
      expect(queryBus.execute).toBeCalledTimes(1);
      expect(queryBus.execute).toBeCalledWith(
        new GetCoordsGeocodeQuery(latitude, longitude),
      );
    });

    it('should return geocode', () => {
      expect(geocode).toEqual(geocodeResponse);
    });
  });
});
