import { type FC, memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';
import { Avatar } from '@ducks-tinder-client/ui';

import { ChatProfileLazy } from './ChatProfile.lazy';
import { ChatProfileMobile } from './components';
import * as styles from './ChatProfile.module.scss';
import { useChatDispatch, useChatSelector } from '@shared/lib/hooks';
import { getChatThunk } from '@entities/chat/model';

interface ChatProfileProps {
  handleOpen: () => void;
}

export const ChatProfile: FC<ChatProfileProps> = memo(({ handleOpen }) => {
  const dispatch = useChatDispatch();

  const { chatId } = useParams<{ chatId: string }>();

  const activeChat = useChatSelector((state) => state.chat.activeChat);
  const isChatLoading = useChatSelector((state) => state.chat.isChatLoading);
  const isNotFound = useChatSelector((state) => state.chat.isNotFound);
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
