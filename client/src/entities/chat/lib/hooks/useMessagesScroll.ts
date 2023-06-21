import type { MutableRefObject } from 'react';
import { useRef } from 'react';
import {
  useAppDispatch,
  useAppSelector,
  useDebouncedCallback,
  useIntersectionObserver,
  useScrollToBottom,
} from '@shared/hooks';
import { getMessagesThunk } from '../../model/chat.thunks';

interface UseMessagesScrollReturn {
  messagesRef: MutableRefObject<HTMLDivElement | null>;
  topScrollRef: MutableRefObject<HTMLDivElement | null>;
}

export function useMessagesScroll(): UseMessagesScrollReturn {
  const dispatch = useAppDispatch();

  const currentChatId = useAppSelector((state) => state.chat.currentChatId);
  const currentMessages = useAppSelector((state) => state.chat.currentMessages);
  const isMessagesEnded = useAppSelector((state) => state.chat.isMessagesEnded);

  const messagesRef = useScrollToBottom([currentChatId], [currentMessages]);

  const topScrollRef = useRef<HTMLDivElement | null>(null);
  const topScrollEntry = useIntersectionObserver(topScrollRef, {});
  const isVisible = topScrollEntry?.isIntersecting;

  const oldScrollHeight = useRef<number>(0);

  const delayedGetMessages = useDebouncedCallback(() => {
    if (!isMessagesEnded) {
      dispatch(getMessagesThunk());
      if (messagesRef.current) {
        messagesRef.current.scrollTop =
          messagesRef.current.scrollHeight - oldScrollHeight.current;
        oldScrollHeight.current = messagesRef.current.scrollHeight;
      }
    }
  });

  if (isVisible) {
    delayedGetMessages();
  }

  return { messagesRef, topScrollRef };
}
