import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@shared/lib/constants';
import { useAppSelector } from '@shared/lib/hooks';
import { Avatar } from '@shared/ui';
import { ChatProfileMobileLazy } from './ChatProfile.mobile-lazy';
import styles from './ChatProfile.mobile.module.scss';

interface ChatProfileProps {
  handleOpen: () => void;
}

export const ChatProfileMobile: FC<ChatProfileProps> = ({ handleOpen }) => {
  const chat = useAppSelector((state) => state.chat.chat);
  const isChatLoading = useAppSelector((state) => state.chat.isChatLoading);

  if (isChatLoading || !chat) {
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
          avatarUrl={chat.avatar}
          extraClassName={styles.avatar}
        />
        <div className={styles.name}>{chat.name}</div>
      </div>
    </div>
  );
};
