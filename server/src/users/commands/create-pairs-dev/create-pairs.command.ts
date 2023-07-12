import { AuthorizedUser } from 'users/users.interface';

export class CreatePairsCommand {
  constructor(public readonly user: AuthorizedUser) {}
}
