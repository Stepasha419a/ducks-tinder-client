import { IsNotEmpty, IsString } from 'class-validator';

export class NameObjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
