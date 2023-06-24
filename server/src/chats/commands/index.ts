export { CreateChatCommand } from './create-chat';
export { SendMessageCommand } from './send-message';
export { DeleteMessageCommand } from './delete-message';
export { EditMessageCommand } from './edit-message';

import { CreateChatCommandHandler } from './create-chat';
import { SendMessageCommandHandler } from './send-message';
import { DeleteMessageCommandHandler } from './delete-message';
import { EditMessageCommandHandler } from './edit-message';

export const ChatCommandHandlers = [
  CreateChatCommandHandler,
  SendMessageCommandHandler,
  DeleteMessageCommandHandler,
  EditMessageCommandHandler,
];
