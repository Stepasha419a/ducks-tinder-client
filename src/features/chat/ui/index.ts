import { WithErrorFallback } from '@shared/lib/hocs';

import { BlockChat as BlockChatRaw } from './BlockChat/BlockChat';
import { DeleteChat as DeleteChatRaw } from './DeleteChat/DeleteChat';
import { EditMessage as EditMessageRaw } from './EditMessage/EditMessage';
import { MessageSelect as MessageSelectRaw } from './MessageSelect/MessageSelect';
import { SendMessageForm as SendMessageFormRaw } from './SendMessageForm/SendMessageForm';
import { UnblockChat as UnblockChatRaw } from './UnblockChat/UnblockChat';

export const BlockChat = WithErrorFallback(BlockChatRaw);
export const DeleteChat = WithErrorFallback(DeleteChatRaw);
export const EditMessage = WithErrorFallback(EditMessageRaw);
export const MessageSelect = WithErrorFallback(MessageSelectRaw);
export const SendMessageForm = WithErrorFallback(SendMessageFormRaw);
export const UnblockChat = WithErrorFallback(UnblockChatRaw);
