import { User } from '@prisma/client';

export class DeletePairCommand {
  constructor(public readonly user: User, public readonly userPairId: string) {}
}
