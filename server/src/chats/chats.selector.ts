import { Prisma } from '@prisma/client';

export class ChatsSelector {
  static selectShortMessages(): Prisma.Chat$messagesArgs {
    return {
      take: 1,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        text: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    };
  }

  static selectMessage() {
    return {
      id: true,
      text: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    };
  }
}