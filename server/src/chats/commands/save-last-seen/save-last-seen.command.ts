import { AuthorizedUser } from 'users/users.interface';

export class SaveLastSeenCommand {
  constructor(
    public readonly user: AuthorizedUser,
    public readonly chatId: string,
  ) {}
}
