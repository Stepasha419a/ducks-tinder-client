import type { MutableRefObject } from 'react';

export function scrollToBottom(
  ref: MutableRefObject<HTMLDivElement | null>,
  behaviour?: boolean,
): void {
  if (ref.current && !behaviour) {
    ref.current.scrollTop = ref.current.scrollHeight;
  } else {
    ref.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  }
}
