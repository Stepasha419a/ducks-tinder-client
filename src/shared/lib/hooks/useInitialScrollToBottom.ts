import type { MutableRefObject } from 'react';
import { useEffect } from 'react';
import { scrollToBottom } from '../helpers';

// uses deps to trigger useEffect hooks
export function useInitialScrollToBottom<T = HTMLDivElement | null>(
  ref: MutableRefObject<T>,
  initialDeps: unknown[]
) {
  useEffect(() => {
    if (ref.current) {
      scrollToBottom(ref as MutableRefObject<HTMLDivElement | null>);
    }
    // these deps work incorrect => requires to spread them
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...initialDeps]);
}
