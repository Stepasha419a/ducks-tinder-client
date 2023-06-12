import { User } from '@prisma/client';

export class GetPairsQuery {
  constructor(public readonly user: User) {}
}
