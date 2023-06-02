import { User } from '@prisma/client';

export class GetSortedCommand {
  constructor(public readonly user: User) {}
}
