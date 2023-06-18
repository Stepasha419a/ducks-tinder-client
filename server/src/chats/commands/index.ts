export { CreateChatCommand } from './create-chat';
export { SendMessageCommand } from './send-message';

import { CreateChatCommandHandler } from './create-chat';
import { SendMessageCommandHandler } from './send-message';

export const ChatCommandHandlers = [
  CreateChatCommandHandler,
  SendMessageCommandHandler,
];
