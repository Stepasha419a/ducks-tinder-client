import type { AuthorizedUser } from 'users/users.interface';

export class GetNewMessagesQuery {
  constructor(
    public readonly user: AuthorizedUser,
    public readonly activeChatId: string,
  ) {}
}
