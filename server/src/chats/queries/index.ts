export { GetChatsQuery } from './get-chats';
export { GetChatQuery } from './get-chat';
export { GetMessagesQuery } from './get-messages';

import { GetChatsQueryHandler } from './get-chats';
import { GetChatQueryHandler } from './get-chat';
import { GetMessagesQueryHandler } from './get-messages';

export const ChatQueryHandlers = [
  GetChatsQueryHandler,
  GetChatQueryHandler,
  GetMessagesQueryHandler,
];
