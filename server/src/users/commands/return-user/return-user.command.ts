import { User } from '@prisma/client';

export class ReturnUserCommand {
  constructor(public readonly user: User) {}
}
