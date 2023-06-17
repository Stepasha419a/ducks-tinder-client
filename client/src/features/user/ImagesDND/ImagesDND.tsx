import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectImagesDND, setIsDialogUploadOpen } from '@entities/user/model';
import { createEmptyArray, makeImageUrl } from '@shared/helpers';
import { Card } from './components';
import { useImagesDragAndDrop } from './lib';
import styles from './ImagesDND.module.scss';

export const ImagesDND: FC = () => {
  const dispatch = useAppDispatch();

  const { currentUserId, pictures } = useAppSelector(selectImagesDND);

  const { images, handleDeleteImage, getDNDProps } = useImagesDragAndDrop(
    styles.lowOpacity
  );

  const openSettingHandler = (): void => {
    dispatch(setIsDialogUploadOpen(true));
  };

  const emptyFieldsForLoop: undefined[] = createEmptyArray(9 - pictures.length);

  return (
    <div className={styles.images}>
      {images.map((imageObj) => {
        return (
          <Card
            key={imageObj.order}
            buttonHandler={() => handleDeleteImage(imageObj.order)}
            src={makeImageUrl(currentUserId, imageObj.name)}
            {...getDNDProps(imageObj)}
          />
        );
      })}
      {emptyFieldsForLoop.map((_, i) => {
        return <Card key={i} handler={openSettingHandler} />;
      })}
    </div>
  );
};
