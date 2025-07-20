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
import { checkAuthThunk } from '@entities/user';
import type {
  ReceivedChatBlock,
  ReceivedMessage,
  ReceivedNewMessage,
} from '@shared/api';
import { serviceGetter, ChatSocketEvent } from '@shared/api';
import type { WsExceptionError } from '@shared/lib';
import { useAppDispatch, useAppSelector } from '@shared/lib';

export function useChatConnection() {
  const dispatch = useAppDispatch();

  const currentUserId = useAppSelector((state) => state.user.currentUser?.id);

  useEffect(() => {
    if (!currentUserId) {
      return;
    }

    const { on, onAny } = serviceGetter.getChatService().connect();

    dispatch(setConnectedSocket());

    onAny((event: string, ...errors: unknown[]) => {
      if (event === 'exception' && (errors[0] as WsExceptionError).message) {
        switch ((errors[0] as WsExceptionError).message) {
          case 'Unauthorized':
            dispatch(checkAuthThunk());
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
      dispatch(pushNewMessage({ ...data, currentUserId }));
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
      serviceGetter.getChatService().disconnect();
    };
  }, [dispatch]);
}
