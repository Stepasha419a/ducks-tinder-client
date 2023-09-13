import type { FC } from 'react';
import { Avatar } from '@shared/ui';
import { useAppSelector, useMediaQuery } from '@shared/lib/hooks';
import { selectChatProfile } from '../../model';
import styles from './ChatProfile.module.scss';
import { ChatProfileMobile } from './mobile/ChatProfile.mobile';

interface ChatProfileProps {
  handleOpen: () => void;
}

export const ChatProfile: FC<ChatProfileProps> = ({ handleOpen }) => {
  const { currentChatUser } = useAppSelector(selectChatProfile);
  const isMobile = useMediaQuery('(max-width: 900px)');

  if (isMobile) {
    return <ChatProfileMobile handleOpen={handleOpen} />;
  }

  if (!currentChatUser) {
    return null;
  }

  return (
    <div className={styles.profile}>
      <div onClick={handleOpen} className={styles.user}>
        <Avatar
          userId={currentChatUser.id}
          size="m"
          avatarUrl={currentChatUser.pictures[0]?.name}
          extraClassName={styles.avatar}
        />
        <div className={styles.name}>{currentChatUser.name}</div>
      </div>
    </div>
  );
};
