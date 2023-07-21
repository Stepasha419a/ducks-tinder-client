export { GetChatsQuery } from './get-chats';
export { GetChatQuery } from './get-chat';
export { GetMessagesQuery } from './get-messages';
export { ValidateChatMemberQuery } from './validate-chat-member';
export { GetNewMessagesQuery } from './get-new-messages';

import { GetChatsQueryHandler } from './get-chats';
import { GetChatQueryHandler } from './get-chat';
import { GetMessagesQueryHandler } from './get-messages';
import { ValidateChatMemberQueryHandler } from './validate-chat-member';
import { GetNewMessagesQueryHandler } from './get-new-messages';

export const ChatQueryHandlers = [
  GetChatsQueryHandler,
  GetChatQueryHandler,
  GetMessagesQueryHandler,
  ValidateChatMemberQueryHandler,
  GetNewMessagesQueryHandler,
];
