import { User } from '@prisma/client';

export class GetChatQuery {
  constructor(public readonly user: User, public readonly id: string) {}
}
