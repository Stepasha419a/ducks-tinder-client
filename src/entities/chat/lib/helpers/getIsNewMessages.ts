import type { Chat } from '@shared/api/interfaces';
import { getDatesHourDiff } from '@shared/lib/helpers';

export function getIsNewMessages(
  chat: Chat,
  isActive: boolean,
  isCompanion: boolean
): boolean | undefined {
  return (
    isCompanion &&
    !isActive &&
    Boolean(chat.lastMessage?.createdAt) &&
    Boolean(chat.lastSeenAt) &&
    getDatesHourDiff(
      new Date(chat.lastMessage!.createdAt),
      new Date(new Date(chat.lastSeenAt).toUTCString())
    ) > 0
  );
}
