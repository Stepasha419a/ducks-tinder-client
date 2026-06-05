import { useState } from 'react';

import { ChatProfilePopup } from '@widgets/ChatProfilePopup';
import { Messages } from '@widgets/Messages';
import { useChatDispatch } from '@shared/lib/hooks';
import { getMemberThunk, nullMember } from '@entities/chat';

export const ActiveChat = () => {
  const dispatch = useChatDispatch();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    dispatch(nullMember());
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
    dispatch(getMemberThunk());
  };

  return (
    <>
      <Messages handleOpenPopup={handleOpenPopup} />
      {isPopupOpen && <ChatProfilePopup handleClose={handleClosePopup} />}
    </>
  );
};
