import { useState } from 'react';
import { useAppDispatch } from '@shared/lib/hooks';
import { ChatProfilePopup, Messages } from '@/widgets/ui';
import { getMemberThunk, nullMember } from '@entities/chat/model';

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
