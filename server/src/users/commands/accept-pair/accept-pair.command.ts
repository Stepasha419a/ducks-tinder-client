import { User } from '@prisma/client';

export class AcceptPairCommand {
  constructor(public readonly user: User, public readonly userPairId: string) {}
}
