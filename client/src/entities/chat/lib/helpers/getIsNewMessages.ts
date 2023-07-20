import type { ShortChat } from '@/shared/api/interfaces';
import { getDatesHourDiff } from '@/shared/lib/helpers';

export function getIsNewMessages(chat: ShortChat): boolean | undefined {
  return (
    (chat.messages[0]?.createdAt as Date | undefined) &&
    (chat.chatVisits[0]?.lastSeen as Date | undefined) &&
    getDatesHourDiff(
      new Date(chat.messages[0].createdAt),
      new Date(new Date(chat.chatVisits[0].lastSeen).toUTCString())
    ) > 0
  );
}
