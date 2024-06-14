import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { ROUTES } from '@shared/lib/constants';
import { useAppSelector } from '@shared/lib/hooks';
import { Avatar } from '@shared/ui';
import styles from './ChatProfile.mobile.module.scss';

interface ChatProfileProps {
  handleOpen: () => void;
}

export const ChatProfileMobile: FC<ChatProfileProps> = ({ handleOpen }) => {
  const chat = useAppSelector((state) => state.chat.chat);
  const isChatLoading = useAppSelector((state) => state.chat.isChatLoading);

  if (isChatLoading || !chat) {
    return (
      <div className={styles.profile}>
        <Link className={styles.link} to={ROUTES.CHAT}>
          <FontAwesomeIcon className={styles.icon} icon={faAngleLeft} />
        </Link>
        <div className={styles.user}>
          <Skeleton circle height={40} width={40} />
          <Skeleton className={styles.name} height={22} width={80} />
        </div>
      </div>
    );
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
