import {
  BlockChatSocketReturn,
  ChatSocketMessageReturn,
  ChatSocketReturn,
  GetMessagesQueryReturn,
  Message,
} from './chats.interface';

interface ChatUser {
  id: string;
}

interface Chat {
  id: string;
  users: ChatUser[];
}

interface BlockChat extends Chat {
  blocked: boolean;
  blockedById: string | null;
}

export class ChatsMapper {
  static mapChat(chat: Chat): ChatSocketReturn {
    return {
      chatId: chat.id,
      users: this.mapUserIds(chat.users),
    };
  }

  static mapBlockChat(chat: BlockChat): BlockChatSocketReturn {
    return {
      chatId: chat.id,
      users: this.mapUserIds(chat.users),
      blocked: chat.blocked,
      blockedById: chat.blockedById,
    };
  }

  static mapChatMessage(chat: Chat, message: Message): ChatSocketMessageReturn {
    return {
      chatId: chat.id,
      message,
      users: this.mapUserIds(chat.users),
    };
  }

  static mapChatMessages(
    chat: { id: string },
    messages: Message[],
  ): GetMessagesQueryReturn {
    return {
      chatId: chat.id,
      messages,
    };
  }

  static mapWithoutUsers(
    data: ChatSocketMessageReturn | BlockChatSocketReturn | ChatSocketReturn,
  ) {
    return { ...data, users: undefined };
  }

  private static mapUserIds(users: ChatUser[]) {
    return users.map((user) => user.id);
  }
}
