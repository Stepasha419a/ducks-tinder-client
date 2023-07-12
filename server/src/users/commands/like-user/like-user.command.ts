import { AuthorizedUser } from 'users/users.interface';

export class LikeUserCommand {
  constructor(
    public readonly user: AuthorizedUser,
    public readonly userPairId: string,
  ) {}
}
