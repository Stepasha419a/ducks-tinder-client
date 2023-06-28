import type { MutableRefObject } from 'react';
import { useEffect } from 'react';
import { isRefElementVisible, scrollToBottom } from '../helpers';

// uses deps to trigger useEffect hooks
export function useScrollToBottom<T = HTMLDivElement | null>(
  ref: MutableRefObject<T>,
  deps: unknown[]
) {
  useEffect(() => {
    if (
      ref.current &&
      isRefElementVisible(ref as MutableRefObject<HTMLDivElement | null>)
    ) {
      scrollToBottom(ref as MutableRefObject<HTMLDivElement | null>, true);
    }
  }, [ref, deps]);
}
