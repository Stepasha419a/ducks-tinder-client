import type { FC } from 'react';
import type { ShortUser } from '@shared/api/interfaces';
import { selectChatProfile, setIsChatUserPopup } from '@entities/chat/model';
import { Preview } from '@entities/user/components';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { Popup } from '@shared/ui';
import { BlockChat, DeleteChat, UnblockChat } from '@features/chat';
import styles from './ChatUserPopup.module.scss';

export const ChatUserPopup: FC = () => {
  const dispatch = useAppDispatch();

  const { currentChatUser, blocked, blockedById } =
    useAppSelector(selectChatProfile);
  const currentUserId = useAppSelector((state) => state.user.currentUser.id);
  const isChatUserPopup = useAppSelector((state) => state.chat.isChatUserPopup);

  const handleClose = () => {
    dispatch(setIsChatUserPopup(false));
  };

  if (!isChatUserPopup) {
    return null;
  }

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
