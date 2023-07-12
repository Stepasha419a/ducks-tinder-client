import { AuthorizedUser } from 'users/users.interface';

export class GetSortedQuery {
  constructor(public readonly user: AuthorizedUser) {}
}
