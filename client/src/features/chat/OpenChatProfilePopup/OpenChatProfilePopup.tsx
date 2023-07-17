import { ChatProfile } from '@entities/chat/components';
import { setIsChatUserPopup } from '@entities/chat/model';
import { useAppDispatch } from '@shared/hooks';

export const OpenChatProfilePopup = () => {
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    dispatch(setIsChatUserPopup(true));
  };

  return <ChatProfile handleOpen={handleOpen} />;
};
