import { AuthorizedUser } from 'users/users.interface';
import { EditMessageDto } from 'chats/dto';

export class EditMessageCommand {
  constructor(
    public readonly user: AuthorizedUser,
    public readonly chatId: string,
    public readonly dto: EditMessageDto,
  ) {}
}
