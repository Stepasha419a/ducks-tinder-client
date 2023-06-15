import { User } from '@prisma/client';

export class RemoveAllPairsCommand {
  constructor(public readonly user: User) {}
}
