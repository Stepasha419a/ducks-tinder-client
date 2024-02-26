import type { FC } from 'react';
import { selectCurrentChat } from '@entities/chat/model';
import { useAppSelector } from '@shared/lib/hooks';
import { Avatar } from '@shared/ui';
import styles from './ChatProfile.mobile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ROUTES } from '@shared/lib/constants';

interface ChatProfileProps {
  handleOpen: () => void;
}

export const ChatProfileMobile: FC<ChatProfileProps> = ({ handleOpen }) => {
  const currentChat = useAppSelector(selectCurrentChat);

  if (!currentChat) {
    return null;
  }

  return (
    <div className={styles.profile}>
      <Link className={styles.link} to={ROUTES.chat}>
        <FontAwesomeIcon className={styles.icon} icon={faAngleLeft} />
      </Link>
      <div onClick={handleOpen} className={styles.user}>
        <Avatar
          size="m"
          fullUrl={currentChat.avatar}
          extraClassName={styles.avatar}
        />
        <div className={styles.name}>{currentChat.name}</div>
      </div>
    </div>
  );
};
