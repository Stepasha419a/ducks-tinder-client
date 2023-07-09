import type { Dispatch, FC, SetStateAction } from 'react';
import { Reorder } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectImagesDND, setIsDialogUploadOpen } from '@entities/user/model';
import { createEmptyArray, makeImageUrl } from '@shared/helpers';
import { Card } from './components';
import { useUserPictures } from './lib';
import styles from './PicturesDND.module.scss';
import { Button } from '@/shared/ui';

interface PicturesDNDProps {
  setIsImageSetting: Dispatch<SetStateAction<boolean>>;
}

export const PicturesDND: FC<PicturesDNDProps> = ({ setIsImageSetting }) => {
  const dispatch = useAppDispatch();

  const { currentUserId } = useAppSelector(selectImagesDND);

  const { pictures, setPictures, handleDeletePicture, handleMixPictures } =
    useUserPictures();

  const openSettingHandler = (): void => {
    dispatch(setIsDialogUploadOpen(true));
  };

  const handleSubmit = () => {
    setIsImageSetting(false);
    handleMixPictures();
  };

  return (
    <div className={styles.change}>
      <Reorder.Group
        as="div"
        className={styles.pictures}
        values={pictures}
        onReorder={setPictures}
      >
        {pictures.map((picture) => {
          return (
            <Card
              key={picture.name}
              buttonHandler={() => handleDeletePicture(picture.order)}
              handler={openSettingHandler}
              picture={picture}
              src={makeImageUrl(currentUserId, picture.name)}
            />
          );
        })}
        {createEmptyArray(9 - pictures.length).map((_, i) => {
          return <Card key={i} handler={openSettingHandler} />;
        })}
      </Reorder.Group>
      <div className={styles.descr}>
        Add more photos to fill out your profile
        <br />
        by another 4% and get more likes.
      </div>
      <div className={styles.save}>
        <Button
          onClick={handleSubmit}
          variant="gradient"
          extraClassName={styles.btn}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};
