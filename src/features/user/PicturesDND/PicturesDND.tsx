import type { Dispatch, FC, SetStateAction } from 'react';
import { Reorder } from 'framer-motion';
import type { Picture } from '@shared/api/interfaces';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import {
  deleteUserPictureThunk,
  selectImagesDND,
  setIsDialogUploadOpen,
} from '@entities/user/model';
import { createEmptyArray, makeImageUrl } from '@shared/helpers';
import { Card } from './components';
import styles from './PicturesDND.module.scss';

interface PicturesDNDProps {
  pictures: Picture[];
  setPictures: Dispatch<SetStateAction<Picture[]>>;
}

export const PicturesDND: FC<PicturesDNDProps> = ({
  pictures,
  setPictures,
}) => {
  const dispatch = useAppDispatch();

  const { currentUserId } = useAppSelector(selectImagesDND);

  const handleDeletePicture = (order: number): void => {
    dispatch(deleteUserPictureThunk(order));
  };

  const openSettingHandler = (): void => {
    dispatch(setIsDialogUploadOpen(true));
  };

  return (
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
  );
};
