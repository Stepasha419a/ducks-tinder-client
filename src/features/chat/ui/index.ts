import { WithErrorFallback } from '@shared/lib';

import { ChatControl as ChatControlRaw } from './ChatControl/ChatControl';
import { MessageForm as MessageFormRaw } from './MessageForm/MessageForm';
import { MessageSelect as MessageSelectRaw } from './MessageSelect/MessageSelect';

export const ChatControl = WithErrorFallback(ChatControlRaw);
export const MessageForm = WithErrorFallback(MessageFormRaw);
export const MessageSelect = WithErrorFallback(MessageSelectRaw);
