import { User } from '@prisma/client';

export class LikeUserCommand {
  constructor(public readonly user: User, public readonly userPairId: string) {}
}
