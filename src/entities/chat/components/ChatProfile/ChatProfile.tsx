import type { FC } from 'react';
import { Avatar } from '@shared/ui';
import { useAppSelector, useMediaQuery } from '@shared/lib/hooks';
import { selectCurrentChat } from '../../model';
import styles from './ChatProfile.module.scss';
import { ChatProfileMobile } from './mobile/ChatProfile.mobile';

interface ChatProfileProps {
  handleOpen: () => void;
}

export const ChatProfile: FC<ChatProfileProps> = ({ handleOpen }) => {
  const currentChat = useAppSelector(selectCurrentChat);
  const isMobile = useMediaQuery('(max-width: 900px)');

  if (isMobile) {
    return <ChatProfileMobile handleOpen={handleOpen} />;
  }

  if (!currentChat) {
    return null;
  }

  return (
    <div className={styles.profile}>
      <div onClick={handleOpen} className={styles.user}>
        <Avatar
          size="m"
          avatarUrl={currentChat.avatar}
          extraClassName={styles.avatar}
        />
        <div className={styles.name}>{currentChat.name}</div>
      </div>
    </div>
  );
};
