import { EditMessage, SendMessageForm } from '@/features/chat';
import { useAppSelector } from '@/shared/lib/hooks';

export const ChatForm = () => {
  const isMessageEditing = useAppSelector(
    (state) => state.chat.isMessageEditing
  );

  return isMessageEditing ? <EditMessage /> : <SendMessageForm />;
};
