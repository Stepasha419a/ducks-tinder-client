import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Place } from './validated-user.dto';
import { Type } from 'class-transformer';
import { Interest, PictureInterface, ShortUser } from 'users/users.interface';
import { UserDto } from './user.dto';

export class NotValidatedUserDto implements UserDto {
  @IsUUID()
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
  description: string | null;

  @IsOptional()
  @IsString()
  @Length(6, 16)
  nickname: string | null;

  @IsBoolean()
  isActivated: boolean;

  @IsOptional()
  @IsNumber()
  @Min(18)
  @Max(100)
  age: number | null;

  @IsOptional()
  @Matches(/^(male|female)$/g, {
    message: 'Sex value must be male or female',
  })
  sex: string | null;

  @IsOptional()
  @IsNumber()
  @Min(2)
  @Max(100)
  distance: number | null;

  @IsOptional()
  @IsDefined()
  @IsNotEmptyObject()
  @Type(() => Place)
  place: Place | null;

  @IsBoolean()
  usersOnlyInDistance: boolean;

  @IsOptional()
  @Matches(/^(male|female)$/g, {
    message: 'Prefer sex value must be male or female',
  })
  preferSex: 'male' | 'female' | null;

  @IsOptional()
  @IsNumber()
  @Min(18)
  @Max(100)
  preferAgeFrom: number | null;

  @IsOptional()
  @IsNumber()
  @Min(20)
  @Max(100)
  preferAgeTo: number | null;

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
