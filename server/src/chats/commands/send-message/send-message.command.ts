import { SendMessageDto } from 'chats/dto';
import { ValidatedUserDto } from 'users/dto';

export class SendMessageCommand {
  constructor(
    public readonly user: ValidatedUserDto,
    public readonly dto: SendMessageDto,
  ) {}
}
