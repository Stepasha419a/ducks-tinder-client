import type { Message } from '@shared/api/interfaces';
import { deleteMessageThunk } from '@entities/chat/model';
import { useAppDispatch } from '@shared/lib/hooks';
import type { Dispatch, SetStateAction } from 'react';

export function useMessageSelect(
  setRepliedMessage: Dispatch<SetStateAction<Message | null>>,
  isMessageEditing: boolean,
  setIsMessageEditing: Dispatch<SetStateAction<boolean>>,
  selectedMessage: Message | null,
  handleNullSelectedMessage: () => void
) {
  const dispatch = useAppDispatch();

  const handleSelectClickOutside = () => {
    if (!isMessageEditing) {
      handleNullSelectedMessage();
    }
  };

  const handleDeleteMessage = () => {
    dispatch(deleteMessageThunk(selectedMessage!.id));
  };

  const handleEditMessage = () => {
    setIsMessageEditing(true);
  };

  const handleRepliedMessage = () => {
    setRepliedMessage(selectedMessage);
    handleNullSelectedMessage();
  };

  return {
    handleSelectClickOutside,
    handleDeleteMessage,
    handleEditMessage,
    handleRepliedMessage,
  };
}
