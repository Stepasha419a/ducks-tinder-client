import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ChatIdDto } from './chat-id.dto';

export class EditMessageDto extends ChatIdDto {
  @IsString()
  @IsNotEmpty()
  messageId: string;

  @IsString()
  @Length(1, 800)
  text: string;
}
