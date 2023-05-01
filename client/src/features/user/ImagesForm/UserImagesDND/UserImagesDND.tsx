import type { FC } from 'react';
import { useAppSelector } from '@hooks';
import type { PicturesVariants } from '@shared/api/interfaces';
import { PicturesEnum } from '@shared/api/interfaces';
import { selectImagesDND } from '@entities/user/model';
import { makeImageUrl } from '@shared/helpers';
import { useImagesDragAndDrop } from '@features/user/ImagesForm/lib';
import { Card } from './Card/Card';
import styles from './UserImagesDND.module.scss';

interface UserImagesProps {
  openSettingHandler: (setting: PicturesVariants) => void;
}

export const UserImagesDND: FC<UserImagesProps> = ({ openSettingHandler }) => {
  const { currentUserId, pictures } = useAppSelector(selectImagesDND);

  const { images, handleDeleteImage, getDNDProps } = useImagesDragAndDrop(
    styles.lowOpacity
  );

  const emptyFieldsForLoop: undefined[] = [
    ...(new Array(8 - pictures.gallery.length) as undefined[]),
  ];

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
