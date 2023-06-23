import { User } from '@prisma/client';

export class DeleteMessageCommand {
  constructor(public readonly user: User, public readonly messageId: string) {}
}
