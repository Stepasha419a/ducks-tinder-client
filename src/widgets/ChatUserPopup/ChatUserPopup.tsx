import type { FC } from 'react';
import { selectChatProfile, setIsChatUserPopup } from '@entities/chat/model';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { Avatar, Popup } from '@shared/ui';
import { BlockChat, DeleteChat, UnblockChat } from '@features/chat';
import styles from './ChatUserPopup.module.scss';

export const ChatUserPopup: FC = () => {
  const dispatch = useAppDispatch();

  const { chatAvatar, chatName, blocked, blockedById } =
    useAppSelector(selectChatProfile);
  const currentUserId = useAppSelector((state) => state.user.currentUser.id);
  const isChatUserPopup = useAppSelector((state) => state.chat.isChatUserPopup);

  const handleClose = () => {
    dispatch(setIsChatUserPopup(false));
  };

  if (!isChatUserPopup) {
    return null;
  }

  // TODO: Make chat preview popup with participants and actions
  return (
    <Popup closeHandler={handleClose} size="l">
      <Avatar avatarUrl={chatAvatar} />
      <div>{chatAvatar}</div>
      <div>{chatName}</div>
      <div className={styles.btns}>
        {blocked ? (
          blockedById === currentUserId && <UnblockChat />
        ) : (
          <BlockChat />
        )}
        <DeleteChat />
      </div>
      {/* <Preview
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
      /> */}
    </Popup>
  );
};
