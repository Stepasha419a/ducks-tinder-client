import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Interest, PictureInterface, ShortUser } from 'users/users.interface';
import { UserDto } from './user.dto';

export class Place {
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
  @Type(() => Place)
  place: Place;

  @IsArray()
  @ArrayMaxSize(16)
  interests: Interest[];

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
