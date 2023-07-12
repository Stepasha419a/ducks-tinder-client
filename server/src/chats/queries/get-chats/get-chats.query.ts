import { AuthorizedUser } from 'users/users.interface';

export class GetChatsQuery {
  constructor(public readonly user: AuthorizedUser) {}
}
