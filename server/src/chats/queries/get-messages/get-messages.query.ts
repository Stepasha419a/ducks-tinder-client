import { AuthorizedUser } from 'users/users.interface';
import { Message } from 'chats/chats.interface';
import { GetMessagesDto } from 'chats/dto';

export interface GetMessagesQueryReturn {
  chatId: string;
  messages: Message[];
}

export class GetMessagesQuery {
  constructor(
    public readonly user: AuthorizedUser,
    public readonly chatId: string,
    public readonly dto: GetMessagesDto,
  ) {}
}
