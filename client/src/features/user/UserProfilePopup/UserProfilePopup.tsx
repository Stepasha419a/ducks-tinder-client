import type { FC } from 'react';
import { selectCurrentChatUser } from '@/entities/chat/model';
import { Preview } from '@/entities/user/components';
import { useAppSelector } from '@/shared/hooks';
import { Button, Popup } from '@/shared/ui';
import styles from './UserProfilePopup.module.scss';
import classNames from 'classnames';

interface UserProfilePopupProps {
  handleClose: () => void;
}

export const UserProfilePopup: FC<UserProfilePopupProps> = ({
  handleClose,
}) => {
  const { currentChatUser } = useAppSelector(selectCurrentChatUser);

  const handleBlock = () => {
    console.log('block');
  };

  return (
    <Popup closeHandler={handleClose} size="l">
      <Preview
        user={currentChatUser!}
        isFull
        extraContent={
          <div className={styles.btns}>
            <Button
              onClick={handleBlock}
              extraClassName={classNames(styles.btn, styles.border)}
            >
              Block
            </Button>
          </div>
        }
      />
    </Popup>
  );
};
