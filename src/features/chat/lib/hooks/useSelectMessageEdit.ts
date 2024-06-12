import type { Message } from '@shared/api/interfaces';
import { editMessageThunk } from '@entities/chat/model';
import { useAppDispatch } from '@shared/lib/hooks';

export function useSelectMessageEdit(
  handleStopMessageEditing: () => void,
  selectedMessage: Message | null,
  handleNullSelectedMessage: () => void
) {
  const dispatch = useAppDispatch();

  const handleSaveMessage = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      dispatch(
        editMessageThunk({ messageId: selectedMessage!.id, text: trimmedValue })
      );
      handleNullSelectedMessage();
      handleStopMessageEditing();
    }
  };

  const handleCancelMessage = () => {
    handleNullSelectedMessage();
    handleStopMessageEditing();
  };

  return {
    handleCancelMessage,
    handleSaveMessage,
  };
}
