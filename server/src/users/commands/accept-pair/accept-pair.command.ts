import { AuthorizedUser } from 'users/users.interface';

export class AcceptPairCommand {
  constructor(
    public readonly user: AuthorizedUser,
    public readonly userPairId: string,
  ) {}
}
