import type { ShortChat } from '@/shared/api/interfaces';
import { getDatesHourDiff } from '@/shared/lib/helpers';

export function sortChats(chat1: ShortChat, chat2: ShortChat) {
  if (!chat1.messages.at(-1)?.createdAt) {
    return -1;
  } else if (!chat2.messages.at(-1)?.createdAt) {
    return 1;
  }

  return (
    getDatesHourDiff(
      new Date(chat1.messages.at(-1)!.createdAt),
      new Date(chat2.messages.at(-1)!.createdAt)
    ) * -1
  );
}
