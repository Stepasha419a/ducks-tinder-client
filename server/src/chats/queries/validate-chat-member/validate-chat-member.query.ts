import { User } from '@prisma/client';

export class ValidateChatMemberQuery {
  constructor(public readonly user: User, public readonly chatId: string) {}
}
