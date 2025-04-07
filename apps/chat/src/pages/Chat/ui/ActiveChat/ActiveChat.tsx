import { useState } from 'react';

import { getMemberThunk, nullMember , useAppDispatch } from '@ducks-tinder-client/common';

import { ChatProfilePopup } from '@widgets/ChatProfilePopup';
import { Messages } from '@widgets/Messages';

export const ActiveChat = () => {
  const dispatch = useAppDispatch();

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
