import { WithErrorFallback } from '@shared/lib/hocs';

import { BlockChat as BlockChatRaw } from './BlockChat/BlockChat';
import { DeleteChat as DeleteChatRaw } from './DeleteChat/DeleteChat';
import { MessageSelect as MessageSelectRaw } from './MessageSelect/MessageSelect';
import { MessageForm as MessageFormRaw } from './SendMessageForm/MessageForm';
import { UnblockChat as UnblockChatRaw } from './UnblockChat/UnblockChat';

export const BlockChat = WithErrorFallback(BlockChatRaw);
export const DeleteChat = WithErrorFallback(DeleteChatRaw);
export const MessageSelect = WithErrorFallback(MessageSelectRaw);
export const MessageForm = WithErrorFallback(MessageFormRaw);
export const UnblockChat = WithErrorFallback(UnblockChatRaw);
