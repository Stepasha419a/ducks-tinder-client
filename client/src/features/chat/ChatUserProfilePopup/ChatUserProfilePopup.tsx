import type { FC } from 'react';
import classNames from 'classnames';
import { selectChatProfile } from '@/entities/chat/model';
import { Preview } from '@/entities/user/components';
import { blockChatThunk } from '@/entities/chat/model/chat.thunks';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { Button, Popup } from '@/shared/ui';
import styles from './ChatUserProfilePopup.module.scss';

interface ChatUserProfilePopupProps {
  handleClose: () => void;
}

export const ChatUserProfilePopup: FC<ChatUserProfilePopupProps> = ({
  handleClose,
}) => {
  const dispatch = useAppDispatch();

  const { currentChatUser, blocked } = useAppSelector(selectChatProfile);

  const handleBlock = () => {
    dispatch(blockChatThunk());
  };

  return (
    <Popup closeHandler={handleClose} size="l">
      <Preview
        user={currentChatUser!}
        isFull
        extraContent={
          <>
            {!blocked && (
              <div className={styles.btns}>
                <Button
                  onClick={handleBlock}
                  extraClassName={classNames(styles.btn, styles.border)}
                >
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
