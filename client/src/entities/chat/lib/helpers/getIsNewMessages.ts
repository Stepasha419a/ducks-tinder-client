import type { ShortChat } from '@/shared/api/interfaces';
import { getDatesHourDiff } from '@/shared/lib/helpers';

export function getIsNewMessages(
  chat: ShortChat,
  isActive: boolean
): boolean | undefined {
  return (
    !isActive &&
    chat.messages.at(-1)?.createdAt &&
    (chat.chatVisits[0]?.lastSeen as Date | undefined) &&
    getDatesHourDiff(
      new Date(chat.messages.at(-1)!.createdAt),
      new Date(new Date(chat.chatVisits[0].lastSeen).toUTCString())
    ) > 0
  );
}
