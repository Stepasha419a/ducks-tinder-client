import type { ControlRef } from '@ducks-tinder-client/ui';
import type { RefObject } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { useAppSelector } from '@shared/lib';

export function useMessagesScroll(controlRef: RefObject<ControlRef>) {
  const messagesLength = useAppSelector((state) => state.chat.messages.length);

  const previousMessagesLength = useRef(0);

  const isValidSmoothScroll = useCallback(() => {
    if (controlRef.current) {
      const isNearBottom = controlRef.current.getIsNearWithInitial(300);
      const isAddedMessage = previousMessagesLength.current < messagesLength;

      return isNearBottom && isAddedMessage;
    }
  }, [controlRef, messagesLength]);

  useEffect(() => {
    if (controlRef.current) {
      setTimeout(() => {
        if (isValidSmoothScroll()) {
          controlRef.current?.scrollToInitial(true);
        }

        previousMessagesLength.current = messagesLength;
      }, 0);
    }
  }, [controlRef, isValidSmoothScroll, messagesLength]);
}
