import { useEffect } from 'react';

import type {
  ReceivedChatBlock,
  ReceivedMessage,
  ReceivedNewMessage,
  WsExceptionError,
} from '@ducks-tinder-client/common';
import {
  blockChat,
  chatService,
  ChatSocketEvent,
  checkAuthThunk,
  deleteChat,
  deleteMessage,
  editMessage,
  pushNewMessage,
  setConnectedSocket,
  setIsNotFound,
  unblockChat,
  useAppDispatch,
  useAppSelector,
} from '@ducks-tinder-client/common';

export function useChatConnection() {
  const dispatch = useAppDispatch();

  const currentUserId = useAppSelector((state) => state.user.currentUser?.id);

  useEffect(() => {
    if (!currentUserId) {
      return;
    }

    const { on, onAny } = chatService.connect();

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
      chatService.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
}
