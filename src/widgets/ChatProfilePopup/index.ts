import { WithErrorFallback } from '@shared/lib';
import { ChatProfilePopup as ChatProfilePopupRaw } from './ui/ChatProfilePopup';

export const ChatProfilePopup = WithErrorFallback(ChatProfilePopupRaw);
