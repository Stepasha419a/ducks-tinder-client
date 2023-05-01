import type { FC } from 'react';
import type { PicturesVariants } from '@shared/api/interfaces';
import { Button } from '@shared/ui';
import { UserImagesDND } from './UserImagesDND/UserImagesDND';
import { setIsDialogUploadOpen, setPictureVariant } from '@entities/user/model';
import { useAppDispatch } from '@hooks';
import styles from './ImagesForm.module.scss';

interface ImagesFormProps {
  setIsImageSetting: (isImageSetting: boolean) => void;
}

export const ImagesForm: FC<ImagesFormProps> = ({
  setIsImageSetting,
}) => {
  const dispatch = useAppDispatch();

  const submitHandler = (): void => {
    setIsImageSetting(false);
  };

  const openSettingHandler = (variant: PicturesVariants): void => {
    dispatch(setPictureVariant(variant));
    dispatch(setIsDialogUploadOpen(true));
  };

  return (
    <div className={styles.change}>
      <UserImagesDND openSettingHandler={openSettingHandler} />
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
