import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteMessageDto {
  @IsString()
  @IsNotEmpty()
  messageId: string;
}
