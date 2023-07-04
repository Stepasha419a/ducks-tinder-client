import { IsNumber } from 'class-validator';

export class PatchUserPlaceDto {
  @IsNumber()
  readonly latitude: number;

  @IsNumber()
  readonly longitude: number;
}
