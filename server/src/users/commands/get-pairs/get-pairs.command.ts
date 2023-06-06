import { User } from '@prisma/client';

export class GetPairsCommand {
  constructor(public readonly user: User) {}
}
