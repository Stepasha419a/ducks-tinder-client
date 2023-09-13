import {
  editMessageThunk,
  setCurrentMessage,
  setIsMessageEditing,
} from '@entities/chat/model';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';

export function useSelectMessageEdit() {
  const dispatch = useAppDispatch();

  const currentMessage = useAppSelector((state) => state.chat.currentMessage);

  const handleSaveMessage = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      dispatch(
        editMessageThunk({ messageId: currentMessage!.id, text: trimmedValue })
      );
      dispatch(setCurrentMessage(null));
      dispatch(setIsMessageEditing(false));
    }
  };

  const handleCancelMessage = () => {
    dispatch(setCurrentMessage(null));
    dispatch(setIsMessageEditing(false));
  };

  return {
    handleCancelMessage,
    handleSaveMessage,
  };
}
