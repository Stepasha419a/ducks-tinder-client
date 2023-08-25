import { IsLatitude, IsLongitude, IsNotEmpty, IsString } from 'class-validator';

export class PlaceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;
}
