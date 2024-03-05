import { DAY_IN_MS } from "@/shared/lib/constants";
import type { Message } from "@shared/api/interfaces";

export function getIsNextDayMessage(
  message1: Message,
  message2: Message
): boolean {
  return (
    +new Date(message2.createdAt) - +new Date(message1.createdAt) >= DAY_IN_MS
  );
}
