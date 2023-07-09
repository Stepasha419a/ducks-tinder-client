import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class MixPicturesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(9)
  @Type(() => PictureDto)
  pictures: PictureDto[];
}

class PictureDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  order: number;
}
