import { WithErrorFallback } from '@shared/lib';
import { Messages as MessagesRaw } from './ui/Messages';

export const Messages = WithErrorFallback(MessagesRaw);
