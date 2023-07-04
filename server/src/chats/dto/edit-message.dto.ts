import { IsString, IsNotEmpty, Length } from 'class-validator';
export class EditMessageDto {
  @IsString()
  @IsNotEmpty()
  messageId: string;

  @IsString()
  @Length(1, 800)
  text: string;
}
