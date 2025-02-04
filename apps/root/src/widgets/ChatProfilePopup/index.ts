import { WithErrorFallback } from '@ducks-tinder-client/common';
import { ChatProfilePopup as ChatProfilePopupRaw } from './ui/ChatProfilePopup';

export const ChatProfilePopup = WithErrorFallback(ChatProfilePopupRaw);
