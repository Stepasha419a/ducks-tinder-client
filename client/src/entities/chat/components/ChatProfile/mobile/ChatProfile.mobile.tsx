import type { FC } from 'react';
import { selectChatProfile } from '@entities/chat/model';
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
  const { currentChatUser } = useAppSelector(selectChatProfile);

  if (!currentChatUser) {
    return null;
  }

  return (
    <div className={styles.profile}>
      <Link className={styles.link} to={ROUTES.chat}>
        <FontAwesomeIcon className={styles.icon} icon={faAngleLeft} />
      </Link>
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
