import type { RefObject } from 'react';
import { useEffect } from 'react';

import { isRefElementVisible, scrollToBottom } from '../helpers';

// uses deps to trigger useEffect hooks
export function useScrollToBottom<T = HTMLDivElement | null>(
  ref: RefObject<T>,
  deps: unknown[]
) {
  useEffect(() => {
    if (
      ref.current &&
      isRefElementVisible(ref as RefObject<HTMLDivElement | null>)
    ) {
      scrollToBottom(ref as RefObject<HTMLDivElement | null>, true);
    }
  }, [ref, deps]);
}
