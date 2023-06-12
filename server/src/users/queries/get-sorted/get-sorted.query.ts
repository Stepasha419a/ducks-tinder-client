import { User } from '@prisma/client';

export class GetSortedQuery {
  constructor(public readonly user: User) {}
}
