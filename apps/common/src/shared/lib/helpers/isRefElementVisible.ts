import type { MutableRefObject } from 'react';

export function isRefElementVisible(
  ref: MutableRefObject<HTMLDivElement | null>
) {
  const rect = ref.current?.lastElementChild?.getBoundingClientRect();
  if (rect) {
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom - 300 <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  return undefined;
}
