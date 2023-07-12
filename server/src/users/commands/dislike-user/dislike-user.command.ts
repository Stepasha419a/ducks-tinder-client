import { AuthorizedUser } from 'users/users.interface';

export class DislikeUserCommand {
  constructor(
    public readonly user: AuthorizedUser,
    public readonly userPairId: string,
  ) {}
}
