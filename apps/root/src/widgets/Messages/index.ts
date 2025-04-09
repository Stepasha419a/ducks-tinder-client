import { WithErrorFallback } from '@ducks-tinder-client/common';

import { Messages as MessagesRaw } from './ui/Messages';

export const Messages = WithErrorFallback(MessagesRaw);
