import { AuthorizedUser } from 'users/users.interface';

export class ReturnUserCommand {
  constructor(public readonly user: AuthorizedUser) {}
}
