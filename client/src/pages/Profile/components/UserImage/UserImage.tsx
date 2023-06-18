import type { FC } from 'react';
import { useAppSelector } from '@hooks';
import { Button } from '@shared/ui';
import { Preview } from '@entities/user/components';
import styles from './UserImage.module.scss';

interface UserImageProps {
  setIsImageSetting: (isImageSetting: boolean) => void;
}

export const UserImage: FC<UserImageProps> = ({ setIsImageSetting }) => {
  const currentUser = useAppSelector((state) => state.user.currentUser);

  return (
    <>
      <Preview user={currentUser} isFull extraClassName={styles.padding} />
      <div className={styles.edit}>
        <Button
          onClick={() => setIsImageSetting(true)}
          variant="gradient"
          extraClassName={styles.btn}
        >
          Edit Info
        </Button>
      </div>
    </>
  );
};
