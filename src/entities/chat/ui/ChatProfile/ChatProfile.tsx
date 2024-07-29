import { useEffect, type FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
  useAdaptiveMediaQuery,
} from '@shared/lib';
import { Avatar } from '@shared/ui';
import { getChatThunk } from '../../model';
import { ChatProfileLazy } from './ChatProfile.lazy';
import styles from './ChatProfile.module.scss';
import { ChatProfileMobile } from './components';

interface ChatProfileProps {
  handleOpen: () => void;
}

export const ChatProfile: FC<ChatProfileProps> = memo(({ handleOpen }) => {
  const dispatch = useAppDispatch();

  const { chatId } = useParams<{ chatId: string }>();

  const chat = useAppSelector((state) => state.chat.chat);
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

  if (isChatLoading || !chat) {
    return <ChatProfileLazy />;
  }

  return (
    <div className={styles.profile}>
      <div onClick={handleOpen} className={styles.user}>
        <Avatar
          size="m"
          avatarUrl={chat.avatar}
          extraClassName={styles.avatar}
        />
        <div className={styles.name}>{chat.name}</div>
      </div>
    </div>
  );
});

ChatProfile.displayName = 'ChatProfile';
