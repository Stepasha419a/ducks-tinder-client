import {
  deleteMessageThunk,
  setCurrentMessage,
  setIsMessageEditing,
  setRepliedMessage,
} from '@entities/chat/model';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';

export function useMessageSelect() {
  const dispatch = useAppDispatch();

  const isMessageEditing = useAppSelector(
    (state) => state.chat.isMessageEditing
  );
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
    dispatch(setIsMessageEditing(true));
  };

  const handleRepliedMessage = () => {
    dispatch(setRepliedMessage(currentMessage));
    dispatch(setCurrentMessage(null));
  };

  return {
    handleSelectClickOutside,
    handleDeleteMessage,
    handleEditMessage,
    handleRepliedMessage,
  };
}
