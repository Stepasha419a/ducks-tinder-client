import { useState } from 'react';
import { ChatProfilePopup, Messages } from '@widgets';
import { getMemberThunk, nullMember } from '@entities/chat';
import { useAppDispatch } from '@shared/lib/hooks';

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
