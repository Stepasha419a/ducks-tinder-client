import type { Message } from '@shared/api/interfaces';

export function getIsNextDayMessage(
  message1: Message,
  message2: Message
): boolean {
  return (
    Math.abs(
      new Date(message1.createdAt).getUTCDay() -
        new Date(message2.createdAt).getUTCDay()
    ) >= 1
  );
}
