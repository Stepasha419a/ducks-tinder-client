import { getFormattedDateString } from '@ducks-tinder-client/common';
import type { Message } from '@shared/api';

export function getIsNextDayMessage(
  message1: Message,
  message2: Message
): boolean {
  return (
    getFormattedDateString(new Date(message2.createdAt)) !==
    getFormattedDateString(new Date(message1.createdAt))
  );
}
