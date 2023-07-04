import { IsEmail, MaxLength, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @MaxLength(50)
  readonly email: string;

  @IsString()
  @Length(6, 30)
  readonly password: string;
}
