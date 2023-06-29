import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetCoordsGeocodeQuery } from './queries';
import { Geocode } from './maps.interface';

@Injectable()
export class MapsService {
  constructor(private readonly queryBus: QueryBus) {}

  getCoordsGeocode(latitude: number, longitude: number): Promise<Geocode> {
    return this.queryBus.execute(
      new GetCoordsGeocodeQuery(latitude, longitude),
    );
  }
}
