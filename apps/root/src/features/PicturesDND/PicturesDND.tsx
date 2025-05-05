import type { Dispatch, FC, SetStateAction } from 'react';
import { Reorder } from 'framer-motion';

import type { Picture } from '@ducks-tinder-client/common';
import {
  createEmptyArray,
  deleteUserPictureThunk,
  useAppDispatch,
} from '@ducks-tinder-client/common';
import { makeImageUrl } from '@ducks-tinder-client/ui';

import { Card } from './ui';
import styles from './PicturesDND.module.scss';

interface PicturesDNDProps {
  pictures: Picture[];
  setPictures: Dispatch<SetStateAction<Picture[]>>;
  handleOpenUpload: () => void;
}

export const PicturesDND: FC<PicturesDNDProps> = ({
  pictures,
  setPictures,
  handleOpenUpload,
}) => {
  const dispatch = useAppDispatch();

  const handleDeletePicture = (id: string): void => {
    dispatch(deleteUserPictureThunk(id));
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
            buttonHandler={() => handleDeletePicture(picture.id)}
            handler={handleOpenUpload}
            picture={picture}
            src={makeImageUrl(picture.name)}
          />
        );
      })}
      {createEmptyArray(9 - pictures.length).map((_, i) => {
        return <Card key={i} handler={handleOpenUpload} />;
      })}
    </Reorder.Group>
  );
};
