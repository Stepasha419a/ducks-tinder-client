import { Test } from '@nestjs/testing';
import { GetCoordsGeocodeQuery } from './get-coords-geocode.query';
import { GetCoordsGeocodeQueryHandler } from './get-coords-geocode.query-handler';
import { ConfigServiceMock, httpServiceMock } from 'maps/test/mocks';
import { Geocode } from 'maps/maps.interface';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { of } from 'rxjs';

describe('when get sorted is called', () => {
  let getCoordsGeocodeQueryHandler: GetCoordsGeocodeQueryHandler;

  let httpService: HttpService;
  let configService: ConfigService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GetCoordsGeocodeQueryHandler],
      imports: [
        HttpModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
      ],
    })
      .overrideProvider(HttpService)
      .useValue(httpServiceMock())
      .overrideProvider(ConfigService)
      .useValue(ConfigServiceMock())
      .compile();

    getCoordsGeocodeQueryHandler = moduleRef.get<GetCoordsGeocodeQueryHandler>(
      GetCoordsGeocodeQueryHandler,
    );
    httpService = moduleRef.get<HttpService>(HttpService);
    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      const httpResponse = {
        response: {
          GeoObjectCollection: {
            featureMember: [
              {
                GeoObject: {
                  name: 'geocode-name',
                  description: 'geocode-description',
                },
              },
            ],
          },
        },
      };
      httpService.get = jest.fn().mockReturnValue(of({ data: httpResponse }));
    });

    let geocode: Geocode;
    const latitude = 12.123123;
    const longitude = 34.345345;

    beforeEach(async () => {
      jest.clearAllMocks();
      configService.get = jest
        .fn()
        .mockReturnValueOnce('geocode-api-url')
        .mockReturnValue('geocode-api-key');
      geocode = await getCoordsGeocodeQueryHandler.execute(
        new GetCoordsGeocodeQuery(latitude, longitude),
      );
    });

    it('should call config service get', () => {
      expect(configService.get).toBeCalledTimes(2);
      expect(configService.get).toHaveBeenNthCalledWith(1, 'GEOCODE_API_URL');
      expect(configService.get).toHaveBeenNthCalledWith(2, 'GEOCODE_API_KEY');
    });

    it('should call http service get', () => {
      expect(httpService.get).toBeCalledTimes(1);
      expect(httpService.get).toBeCalledWith(
        `geocode-api-url?apikey=geocode-api-key&geocode=${latitude},${longitude}&results=1&format=json&lang=en_US`,
      );
    });

    it('should return a geocode', () => {
      expect(geocode).toEqual({
        address: 'geocode-name',
        name: 'geocode-description',
      });
    });
  });

  describe('when there is no address (problems with api)', () => {
    beforeAll(() => {
      const httpResponse = {
        response: undefined,
      };
      httpService.get = jest.fn().mockReturnValue(of({ data: httpResponse }));
    });

    let geocode: Geocode;
    let error;
    const latitude = 12.123123;
    const longitude = 34.345345;

    beforeEach(async () => {
      jest.clearAllMocks();
      configService.get = jest
        .fn()
        .mockReturnValueOnce('geocode-api-url')
        .mockReturnValue('geocode-api-key');
      try {
        geocode = await getCoordsGeocodeQueryHandler.execute(
          new GetCoordsGeocodeQuery(latitude, longitude),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call config service get', () => {
      expect(configService.get).toBeCalledTimes(2);
      expect(configService.get).toHaveBeenNthCalledWith(1, 'GEOCODE_API_URL');
      expect(configService.get).toHaveBeenNthCalledWith(2, 'GEOCODE_API_KEY');
    });

    it('should call http service get', () => {
      expect(httpService.get).toBeCalledTimes(1);
      expect(httpService.get).toBeCalledWith(
        `geocode-api-url?apikey=geocode-api-key&geocode=${latitude},${longitude}&results=1&format=json&lang=en_US`,
      );
    });

    it('should return undefined', () => {
      expect(geocode).toEqual(undefined);
    });

    it('should throw an error', () => {
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('Not Found');
    });
  });
});
