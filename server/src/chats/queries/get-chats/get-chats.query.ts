import { User } from '@prisma/client';

export class GetChatsQuery {
  constructor(public readonly user: User) {}
}
