import { ChatIdDto } from 'chats/dto';
import { ValidatedUserDto } from 'users/dto';

export class BlockChatCommand {
  constructor(
    public readonly user: ValidatedUserDto,
    public readonly dto: ChatIdDto,
  ) {}
}
