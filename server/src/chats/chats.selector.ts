export class ChatsSelector {
  static selectMessage() {
    return {
      id: true,
      text: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
      replied: {
        select: {
          id: true,
          text: true,
          userId: true,
        },
      },
    };
  }
}
