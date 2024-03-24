import type { Message } from '@/shared/api/interfaces';
import { deleteMessageThunk, setCurrentMessage } from '@entities/chat/model';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import type { Dispatch, SetStateAction } from 'react';

export function useMessageSelect(
  setRepliedMessage: Dispatch<SetStateAction<Message | null>>,
  isMessageEditing: boolean,
  setIsMessageEditing: Dispatch<SetStateAction<boolean>>
) {
  const dispatch = useAppDispatch();
  const currentMessage = useAppSelector((state) => state.chat.currentMessage);

  const handleSelectClickOutside = () => {
    if (!isMessageEditing) {
      dispatch(setCurrentMessage(null));
    }
  };

  const handleDeleteMessage = () => {
    dispatch(deleteMessageThunk(currentMessage!.id));
  };

  const handleEditMessage = () => {
    setIsMessageEditing(true);
  };

  const handleRepliedMessage = () => {
    setRepliedMessage(currentMessage);
    dispatch(setCurrentMessage(null));
  };

  return {
    handleSelectClickOutside,
    handleDeleteMessage,
    handleEditMessage,
    handleRepliedMessage,
  };
}
