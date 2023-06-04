import { User } from '@prisma/client';

export class DislikeUserCommand {
  constructor(public readonly user: User, public readonly userPairId: string) {}
}
