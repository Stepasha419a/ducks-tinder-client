import { ROUTES } from '@ducks-tinder-client/common';
import { Avatar } from '@ducks-tinder-client/ui';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@shared/lib';
import { ChatProfileMobileLazy } from './ChatProfile.mobile-lazy';
import styles from './ChatProfile.mobile.module.scss';

interface ChatProfileProps {
  handleOpen: () => void;
}

export const ChatProfileMobile: FC<ChatProfileProps> = ({ handleOpen }) => {
  const activeChat = useAppSelector((state) => state.chat.activeChat);
  const isChatLoading = useAppSelector((state) => state.chat.isChatLoading);

  if (isChatLoading || !activeChat) {
    return <ChatProfileMobileLazy />;
  }

  return (
    <div className={styles.profile}>
      <Link className={styles.link} to={ROUTES.CHAT}>
        <FontAwesomeIcon className={styles.icon} icon={faAngleLeft} />
      </Link>
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
};
