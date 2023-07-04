import { IsString, Length, ValidateIf } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @Length(1, 800)
  text: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  repliedId: string | null;
}
