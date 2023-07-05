import { User } from '@prisma/client';

export class UnblockChatCommand {
  constructor(public readonly user: User, public readonly chatId: string) {}
}
