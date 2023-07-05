import { User } from '@prisma/client';
export class BlockChatCommand {
  constructor(public readonly user: User, public readonly chatId: string) {}
}
