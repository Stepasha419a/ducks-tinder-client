import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { scrollToBottom } from '@/shared/lib/helpers';
import { useAppSelector } from '@/shared/lib/hooks';

export function useMessagesScroll() {
  const isMessagesInitialLoading = useAppSelector(
    (state) => state.chat.isMessagesInitialLoading
  );

  const messagesLength = useAppSelector((state) => state.chat.messages.length);

  const messagesRef = useRef<HTMLDivElement | null>(null);
  const messagesBottomRef = useRef<HTMLDivElement | null>(null);
  const previousMessagesLength = useRef(0);

  useLayoutEffect(() => {
    if (messagesRef.current && !isMessagesInitialLoading) {
      scrollToBottom(messagesRef);
    }
  }, [isMessagesInitialLoading]);

  const isValidSmoothScroll = useCallback(() => {
    if (messagesBottomRef.current && messagesRef.current) {
      const isNearBottom =
        messagesRef.current.scrollHeight - messagesRef.current.scrollTop <
        messagesRef.current.clientHeight + 300;
      const isAddedMessage = previousMessagesLength.current < messagesLength;

      return isNearBottom && isAddedMessage;
    }
  }, [messagesLength]);

  useEffect(() => {
    if (messagesBottomRef.current && messagesRef.current) {
      setTimeout(() => {
        if (isValidSmoothScroll()) {
          messagesBottomRef.current!.scrollIntoView({ behavior: 'smooth' });
        }

        previousMessagesLength.current = messagesLength;
      }, 0);
    }
  }, [isValidSmoothScroll, messagesLength]);

  return {
    messagesRef,
    messagesBottomRef,
  };
}
