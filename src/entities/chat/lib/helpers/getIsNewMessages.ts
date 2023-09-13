import type { ShortChat } from '@shared/api/interfaces';
import { getDatesHourDiff } from '@shared/lib/helpers';

export function getIsNewMessages(
  chat: ShortChat,
  isActive: boolean,
  isCompanion: boolean
): boolean | undefined {
  return (
    isCompanion &&
    !isActive &&
    Boolean(chat.messages.at(-1)?.createdAt) &&
    Boolean(chat.chatVisits[0]?.lastSeen) &&
    getDatesHourDiff(
      new Date(chat.messages.at(-1)!.createdAt),
      new Date(new Date(chat.chatVisits[0].lastSeen).toUTCString())
    ) > 0
  );
}
