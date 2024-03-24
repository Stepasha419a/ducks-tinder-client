import { editMessageThunk, setCurrentMessage } from '@entities/chat/model';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';

export function useSelectMessageEdit(handleStopMessageEditing: () => void) {
  const dispatch = useAppDispatch();

  const currentMessage = useAppSelector((state) => state.chat.currentMessage);

  const handleSaveMessage = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      dispatch(
        editMessageThunk({ messageId: currentMessage!.id, text: trimmedValue })
      );
      dispatch(setCurrentMessage(null));
      handleStopMessageEditing();
    }
  };

  const handleCancelMessage = () => {
    dispatch(setCurrentMessage(null));
    handleStopMessageEditing();
  };

  return {
    handleCancelMessage,
    handleSaveMessage,
  };
}
