import { useEffect, useRef } from 'react';
import { isRefElementVisible, scrollToBottom } from '../helpers';

// uses deps to trigger useEffect hooks
export function useScrollToBottom(
  initialDeps: Array<unknown>,
  deps: Array<unknown>
) {
  const bottomScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomScrollRef.current) {
      scrollToBottom(bottomScrollRef);
    }
    // these deps work incorrect => requires to spread them
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...initialDeps]);

  useEffect(() => {
    if (bottomScrollRef.current && isRefElementVisible(bottomScrollRef)) {
      scrollToBottom(bottomScrollRef, true);
    }
  }, [deps]);

  return bottomScrollRef;
}
