import type { Dispatch, FC, SetStateAction } from 'react';
import { Reorder } from 'framer-motion';
import type { Picture } from '@/shared/api/interfaces';
import {
  useAppDispatch,
  useAppSelector,
  useMediaQuery,
} from '@shared/lib/hooks';
import {
  deleteUserPictureThunk,
  selectImagesDND,
  setIsDialogUploadOpen,
} from '@entities/user/model';
import { createEmptyArray, makeImageUrl } from '@shared/helpers';
import { Card } from './components';
import { Button } from '@shared/ui';
import { Link } from 'react-router-dom';
import styles from './PicturesDND.module.scss';

interface PicturesDNDProps {
  pictures: Picture[];
  setPictures: Dispatch<SetStateAction<Picture[]>>;
  handleSubmit: () => void;
}

export const PicturesDND: FC<PicturesDNDProps> = ({
  pictures,
  setPictures,
  handleSubmit,
}) => {
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery('(max-width: 900px)');

  const { currentUserId } = useAppSelector(selectImagesDND);

  const handleDeletePicture = (order: number): void => {
    dispatch(deleteUserPictureThunk(order));
  };

  const openSettingHandler = (): void => {
    dispatch(setIsDialogUploadOpen(true));
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
      {!isMobile && (
        <div className={styles.save}>
          <Link to={'/profile'}>
            <Button
              onClick={handleSubmit}
              variant="gradient"
              extraClassName={styles.btn}
            >
              Save changes
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
