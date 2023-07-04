import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(50)
  readonly email: string;

  @IsString()
  @Length(6, 30)
  readonly password: string;

  @IsString()
  @Length(2, 14)
  readonly name: string;
}
