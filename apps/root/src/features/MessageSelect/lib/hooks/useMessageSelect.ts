import type { Message } from '@ducks-tinder-client/common';
import type { Dispatch, SetStateAction } from 'react';
import { deleteMessageThunk } from '@entities/chat';
import { useAppDispatch } from '@shared/lib';

export function useMessageSelect(
  setRepliedMessage: Dispatch<SetStateAction<Message | null>>,
  editingMessage: Message | null,
  setEditingMessage: Dispatch<SetStateAction<Message | null>>,
  selectedMessage: Message | null,
  handleNullSelectedMessage: () => void
) {
  const dispatch = useAppDispatch();

  const handleSelectClickOutside = () => {
    if (!editingMessage) {
      handleNullSelectedMessage();
    }
  };

  const handleDeleteMessage = () => {
    dispatch(deleteMessageThunk(selectedMessage!.id));
    handleNullSelectedMessage();
  };

  const handleEditMessage = () => {
    setEditingMessage(selectedMessage);
    handleNullSelectedMessage();
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
