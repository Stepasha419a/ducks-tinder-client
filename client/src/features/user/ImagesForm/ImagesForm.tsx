import type { FC } from 'react';
import type { PicturesVariants, User } from '@shared/api/interfaces';
import { Button } from '@shared/ui';
import { UserImagesDND } from './UserImagesDND/UserImagesDND';
import styles from './ImagesForm.module.scss';

interface ImagesFormProps {
  currentUser: User;
  setIsImageSetting: (isImageSetting: boolean) => void;
  openSettingHandler: (variant: PicturesVariants) => void;
}

export const ImagesForm: FC<ImagesFormProps> = ({
  currentUser,
  setIsImageSetting,
  openSettingHandler,
}) => {
  const submitHandler = (): void => {
    setIsImageSetting(false);
  };

  return (
    <div className={styles.change}>
      <UserImagesDND
        currentUser={currentUser}
        openSettingHandler={openSettingHandler}
      />
      <div className={styles.descr}>
        Add more photos to fill out your profile
        <br />
        by another 4% and get more likes.
      </div>
      <div className={styles.save}>
        <Button
          onClick={submitHandler}
          variant="gradient"
          extraClassName={styles.btn}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};
