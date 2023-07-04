import { User } from '@prisma/client';
import { Message } from 'chats/chats.interfaces';
import { GetMessagesDto } from 'chats/dto';

export interface GetMessagesQueryReturn {
  chatId: string;
  messages: Message[];
}

export class GetMessagesQuery {
  constructor(
    public readonly user: User,
    public readonly chatId: string,
    public readonly dto: GetMessagesDto,
  ) {}
}
