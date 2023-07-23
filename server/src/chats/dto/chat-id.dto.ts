import { IsNotEmpty, IsString } from 'class-validator';

export class ChatIdDto {
  @IsString()
  @IsNotEmpty()
  chatId: string;
}
