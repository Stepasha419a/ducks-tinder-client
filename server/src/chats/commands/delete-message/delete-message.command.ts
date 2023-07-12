import { AuthorizedUser } from 'users/users.interface';
import { DeleteMessageDto } from 'chats/dto';

export class DeleteMessageCommand {
  constructor(
    public readonly user: AuthorizedUser,
    public readonly chatId: string,
    public readonly dto: DeleteMessageDto,
  ) {}
}
