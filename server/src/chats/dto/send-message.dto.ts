import { IsString, Length, ValidateIf } from 'class-validator';
import { ChatIdDto } from './chat-id.dto';

export class SendMessageDto extends ChatIdDto {
  @IsString()
  @Length(1, 800)
  text: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  repliedId: string | null;
}
