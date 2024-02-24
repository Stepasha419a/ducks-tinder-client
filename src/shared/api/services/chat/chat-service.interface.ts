import type { Message, ShortUser } from '../../interfaces';

export interface ShortMessagesPagination {
  chatId: string;
  users: ShortUser[];
  messages: Message[];
}
