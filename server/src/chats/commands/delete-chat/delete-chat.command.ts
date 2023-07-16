import { AuthorizedUser } from 'users/users.interface';

export class DeleteChatCommand {
  constructor(
    public readonly user: AuthorizedUser,
    public readonly chatId: string,
  ) {}
}
