import { IsNumber } from 'class-validator';
import { ChatIdDto } from './chat-id.dto';

export class GetMessagesDto extends ChatIdDto {
  @IsNumber()
  haveCount: number;
}
