import type { RefObject } from 'react';

export function scrollToBottom(
  ref: RefObject<HTMLDivElement | null>,
  behavior?: boolean
): void {
  if (!behavior) {
    ref.current!.scrollTo(0, ref.current!.scrollHeight);
  } else {
    ref.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  }
}
