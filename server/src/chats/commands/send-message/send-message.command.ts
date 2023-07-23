import { AuthorizedUser } from 'users/users.interface';
import { SendMessageDto } from 'chats/dto';

export class SendMessageCommand {
  constructor(
    public readonly user: AuthorizedUser,
    public readonly dto: SendMessageDto,
  ) {}
}
