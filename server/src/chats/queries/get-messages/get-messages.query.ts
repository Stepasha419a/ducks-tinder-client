import { AuthorizedUser } from 'users/users.interface';
import { GetMessagesDto } from 'chats/dto';

export class GetMessagesQuery {
  constructor(
    public readonly user: AuthorizedUser,
    public readonly dto: GetMessagesDto,
  ) {}
}
