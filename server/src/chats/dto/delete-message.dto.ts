import { IsString, IsNotEmpty } from 'class-validator';
import { ChatIdDto } from './chat-id.dto';

export class DeleteMessageDto extends ChatIdDto {
  @IsString()
  @IsNotEmpty()
  messageId: string;
}
