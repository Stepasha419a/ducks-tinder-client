import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { ChatProfilePopup, Messages } from '@widgets';
import { Status } from './components';
import {
  connectChatThunk,
  disconnectChatThunk,
  getMemberThunk,
  nullMember,
} from '@entities/chat/model';

export const ActiveChat = () => {
  const { chatId } = useParams<'chatId'>() as { chatId: string | undefined };

  const dispatch = useAppDispatch();

  const isChatConnected = useAppSelector((state) => state.chat.isChatConnected);
  const isLoading = useAppSelector((state) => state.chat.isLoading);
  const isSocketConnected = useAppSelector(
    (state) => state.chat.isSocketConnected
  );

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(disconnectChatThunk());
    };
  }, [dispatch]);

  useEffect(() => {
    if (chatId && !isLoading && isSocketConnected) {
      dispatch(connectChatThunk({ chatId }));
    }
  }, [dispatch, isLoading, chatId, isSocketConnected]);

  if (!isChatConnected) {
    return <Status />;
  }

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
