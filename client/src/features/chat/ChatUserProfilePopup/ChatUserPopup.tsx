import type { FC } from 'react';
import { selectChatProfile } from '@/entities/chat/model';
import { Preview } from '@/entities/user/components';
import {
  blockChatThunk,
  unblockChatThunk,
} from '@/entities/chat/model/chat.thunks';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { Button, Popup } from '@/shared/ui';
import styles from './ChatUserPopup.module.scss';

interface ChatUserPopupProps {
  handleClose: () => void;
}

export const ChatUserPopup: FC<ChatUserPopupProps> = ({ handleClose }) => {
  const dispatch = useAppDispatch();

  const { currentChatUser, blocked, blockedById } =
    useAppSelector(selectChatProfile);
  const currentUserId = useAppSelector((state) => state.user.currentUser.id);

  const handleBlock = () => {
    dispatch(blockChatThunk());
  };

  const handleUnblock = () => {
    dispatch(unblockChatThunk());
  };

  return (
    <Popup closeHandler={handleClose} size="l">
      <Preview
        user={currentChatUser!}
        isFull
        extraContent={
          <>
            {blocked && blockedById === currentUserId && (
              <div className={styles.btns}>
                <Button onClick={handleUnblock} extraClassName={styles.btn}>
                  Unblock
                </Button>
              </div>
            )}
            {!blocked && (
              <div className={styles.btns}>
                <Button onClick={handleBlock} extraClassName={styles.btn}>
                  Block
                </Button>
              </div>
            )}
          </>
        }
      />
    </Popup>
  );
};
