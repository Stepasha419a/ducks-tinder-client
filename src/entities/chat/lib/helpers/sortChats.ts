import type { Chat } from '@/shared/api/interfaces';
import { getDatesHourDiff } from '@shared/lib/helpers';

export function sortChats(chat1: Chat, chat2: Chat) {
  if (!chat1.lastMessage?.createdAt && chat2.lastMessage?.createdAt) {
    return getDatesHourDiff(
      new Date(chat1.createdAt),
      new Date(chat2.lastMessage.createdAt)
    ) * -1;
  } else if (chat1.lastMessage?.createdAt && !chat2.lastMessage?.createdAt) {
    return getDatesHourDiff(
      new Date(chat1.lastMessage.createdAt),
      new Date(chat2.createdAt)
    ) * -1;
  } else if (!chat1.lastMessage?.createdAt && !chat2.lastMessage?.createdAt) {
    return getDatesHourDiff(
      new Date(chat1.createdAt),
      new Date(chat2.createdAt)
    ) * -1;
  }

  return (
    getDatesHourDiff(
      new Date(chat1.lastMessage!.createdAt),
      new Date(chat2.lastMessage!.createdAt)
    ) * -1
  );
}
