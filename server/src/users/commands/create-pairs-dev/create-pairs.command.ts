import { User } from '@prisma/client';

export class CreatePairsCommand {
  constructor(public readonly user: User) {}
}
