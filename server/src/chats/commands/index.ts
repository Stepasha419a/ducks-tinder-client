export { CreateChatCommand } from './create-chat';
export { SendMessageCommand } from './send-message';
export { DeleteMessageCommand } from './delete-message';
export { EditMessageCommand } from './edit-message';
export { BlockChatCommand } from './block-chat';
export { UnblockChatCommand } from './unblock-chat';
export { DeleteChatCommand } from './delete-chat';
export { SaveLastSeenCommand } from './save-last-seen';

import { CreateChatCommandHandler } from './create-chat';
import { SendMessageCommandHandler } from './send-message';
import { DeleteMessageCommandHandler } from './delete-message';
import { EditMessageCommandHandler } from './edit-message';
import { BlockChatCommandHandler } from './block-chat';
import { UnblockChatCommandHandler } from './unblock-chat';
import { DeleteChatCommandHandler } from './delete-chat';
import { SaveLastSeenCommandHandler } from './save-last-seen';

export const ChatCommandHandlers = [
  CreateChatCommandHandler,
  SendMessageCommandHandler,
  DeleteMessageCommandHandler,
  EditMessageCommandHandler,
  BlockChatCommandHandler,
  UnblockChatCommandHandler,
  DeleteChatCommandHandler,
  SaveLastSeenCommandHandler,
];
