import { AuthorizedUser } from 'users/users.interface';

export class GetPairsQuery {
  constructor(public readonly user: AuthorizedUser) {}
}
