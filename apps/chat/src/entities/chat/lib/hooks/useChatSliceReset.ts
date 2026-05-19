import { disconnectThunk, resetChatSlice } from '@entities/chat';
import { useChatDispatch } from '@shared/lib/hooks';
import { useCallback } from 'react';

export function useChatSliceReset() {
  const dispatch = useChatDispatch();

  const handleResetChatSlice = useCallback(() => {
    dispatch(disconnectThunk());
    dispatch(resetChatSlice());
  }, [dispatch]);

  return { handleResetChatSlice };
}
