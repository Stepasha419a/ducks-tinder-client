import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpService } from '@nestjs/axios';
import { GetCoordsGeocodeQuery } from './get-coords-geocode.query';
import { ConfigService } from '@nestjs/config';
import { map, lastValueFrom } from 'rxjs';
import { NotFoundException } from '@nestjs/common';
import { Geocode } from 'maps/maps.interface';

@QueryHandler(GetCoordsGeocodeQuery)
export class GetCoordsGeocodeQueryHandler
  implements IQueryHandler<GetCoordsGeocodeQuery>
{
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async execute(query: GetCoordsGeocodeQuery): Promise<Geocode> {
    const { latitude, longitude } = query;

    const response = await lastValueFrom(
      this.httpService
        .get(
          `${this.configService.get<string>(
            'GEOCODE_API_URL',
          )}?apikey=${this.configService.get<string>(
            'GEOCODE_API_KEY',
          )}&geocode=${latitude},${longitude}&results=1&format=json&lang=en_US`,
        )
        .pipe(map((res) => res.data)),
    );

    const address =
      response?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
        ?.name;
    const name =
      response?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
        ?.description;

    if (!address || !name) {
      throw new NotFoundException();
    }

    return { address, name };
  }
}
