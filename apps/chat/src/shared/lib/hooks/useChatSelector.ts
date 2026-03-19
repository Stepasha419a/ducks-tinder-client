import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';

export const useChatSelector: TypedUseSelectorHook<ChatState> = useSelector;
