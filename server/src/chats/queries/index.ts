export { GetChatsQuery } from './get-chats';
export { GetChatQuery } from './get-chat';

import { GetChatsQueryHandler } from './get-chats';
import { GetChatQueryHandler } from './get-chat';

export const ChatQueryHandlers = [GetChatsQueryHandler, GetChatQueryHandler];
