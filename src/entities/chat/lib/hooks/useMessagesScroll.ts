import { useCallback, useEffect, useRef } from 'react';
import { useAppSelector } from '@/shared/lib/hooks';

export function useMessagesScroll() {
  const messagesLength = useAppSelector((state) => state.chat.messages.length);

  const messagesRef = useRef<HTMLDivElement | null>(null);
  const messagesBottomRef = useRef<HTMLDivElement | null>(null);
  const previousMessagesLength = useRef(0);

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
