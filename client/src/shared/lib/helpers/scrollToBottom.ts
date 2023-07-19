import type { MutableRefObject } from 'react';

export function scrollToBottom(
  ref: MutableRefObject<HTMLDivElement | null>,
  behavior?: boolean
): void {
  if (!behavior) {
    ref.current!.scrollTop = ref.current!.scrollHeight;
  } else {
    ref.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  }
}
