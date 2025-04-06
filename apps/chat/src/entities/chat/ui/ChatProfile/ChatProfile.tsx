import { type FC, memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  getChatThunk,
  useAdaptiveMediaQuery,
  useAppDispatch,
  useAppSelector,
} from '@ducks-tinder-client/common';
import { Avatar } from '@ducks-tinder-client/ui';

import { ChatProfileLazy } from './ChatProfile.lazy';
import { ChatProfileMobile } from './components';
import styles from './ChatProfile.module.scss';

interface ChatProfileProps {
  handleOpen: () => void;
}

export const ChatProfile: FC<ChatProfileProps> = memo(({ handleOpen }) => {
  const dispatch = useAppDispatch();

  const { chatId } = useParams<{ chatId: string }>();

  const activeChat = useAppSelector((state) => state.chat.activeChat);
  const isChatLoading = useAppSelector((state) => state.chat.isChatLoading);
  const isNotFound = useAppSelector((state) => state.chat.isNotFound);
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  useEffect(() => {
    if (chatId) {
      dispatch(getChatThunk(chatId));
    }
  }, [chatId, dispatch]);

  if (isMobile) {
    return <ChatProfileMobile handleOpen={handleOpen} />;
  }

  if (isNotFound) {
    return null;
  }

  if (isChatLoading || !activeChat) {
    return <ChatProfileLazy />;
  }

  return (
    <div className={styles.profile}>
      <div onClick={handleOpen} className={styles.user}>
        <Avatar
          size="m"
          avatarUrl={activeChat.avatar}
          extraClassName={styles.avatar}
        />
        <div className={styles.name}>{activeChat.name}</div>
      </div>
    </div>
  );
});

ChatProfile.displayName = 'ChatProfile';
