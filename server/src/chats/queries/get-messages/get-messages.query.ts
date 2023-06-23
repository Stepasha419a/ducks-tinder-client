import { User } from '@prisma/client';

export class GetMessagesQuery {
  constructor(
    public readonly user: User,
    public readonly chatId: string,
    public readonly haveCount: number,
  ) {}
}
