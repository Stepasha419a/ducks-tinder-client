import { User } from '@prisma/client';
import { GetMessagesDto } from 'chats/dto';

export class GetMessagesQuery {
  constructor(
    public readonly user: User,
    public readonly dto: GetMessagesDto,
  ) {}
}
