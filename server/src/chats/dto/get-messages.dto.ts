import { IsNumber } from 'class-validator';

export class GetMessagesDto {
  @IsNumber()
  haveCount: number;
}
