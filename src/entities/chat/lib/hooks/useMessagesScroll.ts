import type { MutableRefObject } from 'react';
import { useRef } from 'react';
import {
  useAppDispatch,
  useAppSelector,
  useDebouncedCallback,
  useInitialScrollToBottom,
  useIntersectionObserver,
  useScrollToBottom,
} from '@shared/lib/hooks';
import { getMessagesThunk, selectCurrentMessagesLength } from '../../model';

interface UseMessagesScrollReturn {
  messagesRef: MutableRefObject<HTMLDivElement | null>;
  topScrollRef: MutableRefObject<HTMLDivElement | null>;
}

export function useMessagesScroll(): UseMessagesScrollReturn {
  const dispatch = useAppDispatch();

  const currentChatId = useAppSelector((state) => state.chat.currentChatId);
  const currentMessages = useAppSelector(selectCurrentMessagesLength);
  const isMessagesEnded = useAppSelector((state) => state.chat.isMessagesEnded);
  const isMessagesLoading = useAppSelector(
    (state) => state.chat.isMessagesLoading
  );

  const messagesRef = useRef<HTMLDivElement | null>(null);
  useInitialScrollToBottom(messagesRef, [currentChatId]);
  //useScrollToBottom(messagesRef, [currentMessages]);

  const topScrollRef = useRef<HTMLDivElement | null>(null);
  const topScrollEntry = useIntersectionObserver(topScrollRef, {});
  const isVisible = topScrollEntry?.isIntersecting;

  const delayedGetMessages = useDebouncedCallback(() => {
    if (!isMessagesEnded) {
      if (!isMessagesLoading) {
        dispatch(getMessagesThunk());
      }
      if (messagesRef.current) {
        messagesRef.current.scrollTop = 400;
      }
    }
  });

  if (isVisible) {
    //delayedGetMessages();
  }

  return { messagesRef, topScrollRef };
}
