import { AuthorizedUser } from 'users/users.interface';

export class RemoveAllPairsCommand {
  constructor(public readonly user: AuthorizedUser) {}
}
