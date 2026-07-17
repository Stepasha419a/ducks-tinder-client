import { Messages } from '@widgets/Messages';
import { useChatDispatch } from '@shared/lib/hooks';
import { getMemberThunk } from '@entities/chat';
import { useOpenModal } from '@ducks-tinder-client/ui';
import { ChatProfilePopup } from '@widgets/ChatProfilePopup';

export const ActiveChat = () => {
  const { openModal } = useOpenModal();
  const dispatch = useChatDispatch();

  const handleOpenPopup = () => {
    openModal({ Component: ChatProfilePopup });
    dispatch(getMemberThunk());
  };

  return (
    <>
      <Messages handleOpenPopup={handleOpenPopup} />
    </>
  );
};
