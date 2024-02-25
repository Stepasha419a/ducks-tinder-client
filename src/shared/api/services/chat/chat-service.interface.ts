import type { Message } from '../../interfaces';

export interface ShortMessagesPagination {
  chatId: string;
  messages: Message[];
}
