import { ChatIdDto } from 'chats/dto';
import { AuthorizedUser } from 'users/users.interface';

export class UnblockChatCommand {
  constructor(
    public readonly user: AuthorizedUser,
    public readonly dto: ChatIdDto,
  ) {}
}
