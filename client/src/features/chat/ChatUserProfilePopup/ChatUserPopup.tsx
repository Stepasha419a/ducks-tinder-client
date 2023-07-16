import type { FC } from 'react';
import type { ShortUser } from '@/shared/api/interfaces';
import { selectChatProfile } from '@/entities/chat/model';
import { Preview } from '@/entities/user/components';
import { useAppSelector } from '@/shared/hooks';
import { Popup } from '@/shared/ui';
import { BlockChat, DeleteChat, UnblockChat } from './components';
import styles from './ChatUserPopup.module.scss';

interface ChatUserPopupProps {
  handleClose: () => void;
}

export const ChatUserPopup: FC<ChatUserPopupProps> = ({ handleClose }) => {
  const { currentChatUser, blocked, blockedById } =
    useAppSelector(selectChatProfile);
  const currentUserId = useAppSelector((state) => state.user.currentUser.id);

  return (
    <Popup closeHandler={handleClose} size="l">
      <Preview
        user={currentChatUser! as ShortUser}
        isFull
        extraContent={
          <div className={styles.btns}>
            {blocked ? (
              blockedById === currentUserId && <UnblockChat />
            ) : (
              <BlockChat />
            )}
            <DeleteChat />
          </div>
        }
      />
    </Popup>
  );
};
