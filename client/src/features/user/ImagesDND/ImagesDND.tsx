import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks';
import type { PicturesVariants } from '@shared/api/interfaces';
import { PicturesEnum } from '@shared/api/interfaces';
import {
  selectImagesDND,
  setIsDialogUploadOpen,
  setPictureVariant,
} from '@entities/user/model';
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

  const openSettingHandler = (variant: PicturesVariants): void => {
    dispatch(setPictureVariant(variant));
    dispatch(setIsDialogUploadOpen(true));
  };

  const emptyFieldsForLoop: undefined[] = createEmptyArray(
    8 - pictures.gallery.length
  );

  return (
    <div className={styles.images}>
      {images.map((imageObj, i) => {
        if (!imageObj.image) {
          const setting = i === 0 ? PicturesEnum.avatar : PicturesEnum.gallery;
          return <Card key={i} handler={() => openSettingHandler(setting)} />;
        }
        return (
          <Card
            key={imageObj.id}
            buttonHandler={() =>
              handleDeleteImage(imageObj.image, imageObj.setting)
            }
            src={makeImageUrl(currentUserId, imageObj.image, imageObj.setting)}
            {...getDNDProps(imageObj)}
          />
        );
      })}
      {emptyFieldsForLoop.map((_, i) => {
        return (
          <Card
            key={i}
            handler={() => openSettingHandler(PicturesEnum.gallery)}
          />
        );
      })}
    </div>
  );
};
