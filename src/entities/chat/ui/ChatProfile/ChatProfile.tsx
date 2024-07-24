import { useEffect, type FC } from 'react';
import { useParams } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
  useAdaptiveMediaQuery,
} from '@shared/lib/hooks';
import { Avatar } from '@shared/ui';
import { getChatThunk } from '../../model';
import { ChatProfileLazy } from './ChatProfile.lazy';
import styles from './ChatProfile.module.scss';
import { ChatProfileMobile } from './ui';

interface ChatProfileProps {
  handleOpen: () => void;
}

export const ChatProfile: FC<ChatProfileProps> = ({ handleOpen }) => {
  const dispatch = useAppDispatch();

  const { chatId } = useParams<{ chatId: string }>();

  const chat = useAppSelector((state) => state.chat.chat);
  const isChatLoading = useAppSelector((state) => state.chat.isChatLoading);
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  useEffect(() => {
    if (chatId) {
      dispatch(getChatThunk(chatId));
    }
  }, [chatId, dispatch]);

  if (isMobile) {
    return <ChatProfileMobile handleOpen={handleOpen} />;
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
};
