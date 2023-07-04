import {
  IsEmail,
  IsString,
  Length,
  IsNumber,
  Min,
  Max,
  Matches,
  IsBoolean,
  IsArray,
  ArrayMaxSize,
  IsOptional,
} from 'class-validator';
export class PatchUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(2, 14)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(50, 400)
  description?: string;

  @IsOptional()
  @IsString()
  @Length(6, 16)
  nickname?: string;

  @IsOptional()
  @IsNumber()
  @Min(18)
  @Max(100)
  age?: number;

  @IsOptional()
  @Matches(/^(male|female)$/g, {
    message: 'Sex value must be male or female',
  })
  sex?: string;

  @IsOptional()
  @IsNumber()
  @Min(2)
  @Max(100)
  distance?: number;

  @IsOptional()
  @IsBoolean()
  usersOnlyInDistance?: boolean;

  @IsOptional()
  @Matches(/^(male|female)$/g, {
    message: 'Prefer sex value must be male or female',
  })
  preferSex?: 'male' | 'female';

  @IsOptional()
  @IsNumber()
  @Min(18)
  @Max(100)
  preferAgeFrom?: number;

  @IsOptional()
  @IsNumber()
  @Min(20)
  @Max(100)
  preferAgeTo?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(16)
  interests?: string[];
}
