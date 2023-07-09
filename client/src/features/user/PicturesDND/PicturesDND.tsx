import type { FC } from 'react';
import { Reorder } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectImagesDND, setIsDialogUploadOpen } from '@entities/user/model';
import { createEmptyArray, makeImageUrl } from '@shared/helpers';
import { Card } from './components';
import { useUserPictures } from './lib';
import styles from './PicturesDND.module.scss';

export const PicturesDND: FC = () => {
  const dispatch = useAppDispatch();

  const { currentUserId } = useAppSelector(selectImagesDND);

  const { pictures, setPictures, handleDeletePicture } = useUserPictures();

  const openSettingHandler = (): void => {
    dispatch(setIsDialogUploadOpen(true));
  };

  return (
    <Reorder.Group
      as="div"
      className={styles.images}
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
  );
};
