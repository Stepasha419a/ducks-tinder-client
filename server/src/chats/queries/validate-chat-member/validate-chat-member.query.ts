import { AuthorizedUser } from 'users/users.interface';

export class ValidateChatMemberQuery {
  constructor(
    public readonly user: AuthorizedUser,
    public readonly chatId: string,
  ) {}
}
