import { deleteMessageThunk } from '@entities/chat';
import type { Message } from '@shared/api';
import { useChatDispatch } from '@shared/lib/hooks';
import type { Dispatch, SetStateAction } from 'react';

export function useMessageSelect(
  setRepliedMessage: Dispatch<SetStateAction<Message | null>>,
  editingMessage: Message | null,
  setEditingMessage: Dispatch<SetStateAction<Message | null>>,
  selectedMessage: Message | null,
  handleNullSelectedMessage: () => void
) {
  const dispatch = useChatDispatch();

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
