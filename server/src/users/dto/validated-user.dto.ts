import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { PictureInterface, ShortUser } from 'users/users.interface';
import { UserDto } from './user.dto';
import { NameObjectDto } from './name-object.dto';
import { PlaceDto } from './place.dto';

export class ValidatedUserDto implements UserDto {
  @IsString() // because e2e tests use string ids (not uuid)
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @Length(2, 14)
  name: string;

  @IsOptional()
  @IsString()
  @Length(50, 400)
  description: string;

  @IsOptional()
  @IsString()
  @Length(6, 16)
  nickname: string;

  @IsBoolean()
  isActivated: boolean;

  @IsNumber()
  @Min(18)
  @Max(100)
  age: number;

  @Matches(/^(male|female)$/g, {
    message: 'Sex value must be male or female',
  })
  sex: string;

  @IsNumber()
  @Min(2)
  @Max(100)
  distance: number;

  @IsBoolean()
  usersOnlyInDistance: boolean;

  @Matches(/^(male|female)$/g, {
    message: 'Prefer sex value must be male or female',
  })
  preferSex: 'male' | 'female';

  @IsNumber()
  @Min(18)
  @Max(100)
  preferAgeFrom: number;

  @IsNumber()
  @Min(20)
  @Max(100)
  preferAgeTo: number;

  @IsDefined()
  @IsNotEmptyObject()
  @Type(() => PlaceDto)
  place: PlaceDto;

  @IsArray()
  @ArrayMaxSize(16)
  @ValidateNested({ each: true })
  @Type(() => NameObjectDto)
  interests: NameObjectDto[];

  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => NameObjectDto)
  zodiacSign: NameObjectDto;

  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => NameObjectDto)
  education: NameObjectDto;

  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => NameObjectDto)
  childrenAttitude: NameObjectDto;

  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => NameObjectDto)
  personalityType: NameObjectDto;

  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => NameObjectDto)
  communicationStyle: NameObjectDto;

  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => NameObjectDto)
  attentionSign: NameObjectDto;

  @IsArray()
  @ArrayMaxSize(9)
  pictures: PictureInterface[];

  @IsOptional()
  @IsDefined()
  @IsNotEmptyObject()
  firstPair: ShortUser | undefined;

  @IsNumber()
  pairsCount: number;
}
