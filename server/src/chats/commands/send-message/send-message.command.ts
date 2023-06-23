import { User } from '@prisma/client';

export class SendMessageCommand {
  constructor(
    public readonly user: User,
    public readonly chatId: string,
    public readonly text: string,
  ) {}
}
