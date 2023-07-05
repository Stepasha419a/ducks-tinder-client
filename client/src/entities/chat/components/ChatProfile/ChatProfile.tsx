import type { FC } from 'react';
import { Avatar } from '@/shared/ui';
import { useAppSelector } from '@/shared/hooks';
import { selectCurrentChatUser } from '../../model';
import styles from './ChatProfile.module.scss';

interface ChatProfileProps {
  handleClick: () => void;
}

export const ChatProfile: FC<ChatProfileProps> = ({ handleClick }) => {
  const { currentChatUser } = useAppSelector(selectCurrentChatUser);

  return (
    <>
      <div className={styles.profile}>
        <div onClick={handleClick} className={styles.user}>
          <Avatar
            userId={currentChatUser!.id}
            size="m"
            avatarUrl={currentChatUser!.pictures[0]?.name}
            extraClassName={styles.avatar}
          />
          <div className={styles.name}>{currentChatUser!.name}</div>
        </div>
      </div>
    </>
  );
};
