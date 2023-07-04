import { IsNumber } from 'class-validator';

export class MixPicturesDto {
  @IsNumber()
  mixOrder: number;

  @IsNumber()
  withOrder: number;
}
