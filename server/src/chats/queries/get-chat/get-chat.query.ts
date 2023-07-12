import { AuthorizedUser } from 'users/users.interface';

export class GetChatQuery {
  constructor(
    public readonly user: AuthorizedUser,
    public readonly id: string,
  ) {}
}
