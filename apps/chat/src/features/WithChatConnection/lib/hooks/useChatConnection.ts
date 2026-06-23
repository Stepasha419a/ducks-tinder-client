import { useEffect } from 'react';

import {
  blockChat,
  deleteChat,
  deleteMessage,
  editMessage,
  pushNewMessage,
  setConnectedSocket,
  setIsNotFound,
  unblockChat,
} from '@entities/chat';
import {
  ChatSocketEvent,
  getChatService,
  type ReceivedChatBlock,
  type ReceivedMessage,
  type ReceivedNewMessage,
} from '@shared/api';
import type { WsExceptionError } from '@shared/lib';
import { useChatDispatch } from '@shared/lib/hooks';
import { useRefreshMutation, useUserStore } from '@ducks-tinder-client/auth';

export function useChatConnection() {
  const { mutate } = useRefreshMutation();

  const userId = useUserStore((state) => state.currentUser?.id);

  const dispatch = useChatDispatch();

  useEffect(() => {
    if (!userId) {
      return;
    }

    const { on, onAny } = getChatService().connect();

    dispatch(setConnectedSocket());

    onAny((event: string, ...errors: unknown[]) => {
      if (event === 'exception' && (errors[0] as WsExceptionError).message) {
        switch ((errors[0] as WsExceptionError).message) {
          case 'Unauthorized':
            mutate();
            break;
          case 'Validation failed (uuid v 4 is expected)':
          case 'Not Found':
            dispatch(setIsNotFound(true));
            break;
          default:
            break;
        }
      }
    });

    on(ChatSocketEvent.SendMessage, (data: ReceivedNewMessage) => {
      dispatch(pushNewMessage({ ...data, currentUserId: userId }));
    });

    on(ChatSocketEvent.EditMessage, (data: ReceivedMessage) => {
      dispatch(editMessage(data));
    });

    on(ChatSocketEvent.DeleteMessage, (data: ReceivedMessage) => {
      dispatch(deleteMessage(data));
    });

    on(ChatSocketEvent.BlockChat, (data: ReceivedChatBlock) => {
      dispatch(blockChat(data));
    });

    on(ChatSocketEvent.UnblockChat, (data: ReceivedChatBlock) => {
      dispatch(unblockChat(data));
    });

    on(ChatSocketEvent.DeleteChat, (deletedChatId: string) => {
      dispatch(deleteChat(deletedChatId));
    });

    return () => {
      getChatService().disconnect();
    };
  }, [userId, dispatch, mutate]);
}
