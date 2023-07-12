import { AuthorizedUser } from 'users/users.interface';

export class DeletePairCommand {
  constructor(
    public readonly user: AuthorizedUser,
    public readonly userPairId: string,
  ) {}
}
