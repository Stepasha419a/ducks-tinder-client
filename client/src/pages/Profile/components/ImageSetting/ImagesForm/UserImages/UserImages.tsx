import { DragEvent, FC, useEffect, useState } from 'react';
import { makeImageUrl } from '../../../../../../components/ui/helpers';
import { useAppDispatch } from '../../../../../../hooks';
import {
  ImageInterface,
  PicturesEnum,
  PicturesVariants,
  User,
} from '../../../../../../models/User/User';
import {
  deleteUserImage,
  mixUserImages,
} from '../../../../../../redux/users/users.thunks';
import { parseImages } from '../../../../utils';
import { Card } from '../Card/Card';
import styles from './UserImages.module.scss';

interface UserImagesProps {
  currentUser: User;
  openSettingHandler: (setting: PicturesVariants) => void;
}

export const UserImages: FC<UserImagesProps> = ({
  currentUser,
  openSettingHandler,
}) => {
  const dispatch = useAppDispatch();

  const [currentImage, setCurrentImage] = useState<ImageInterface | null>(null);
  const [images, setImages] = useState<ImageInterface[]>([]);

  useEffect(() => {
    setImages(parseImages(currentUser.pictures));
  }, [currentUser.pictures]);

  const deleteImageHandler = (
    pictureName: string,
    setting: PicturesVariants
  ) => {
    dispatch(deleteUserImage({ pictureName, setting }));
  };

  const dragStartHangler = (
    e: DragEvent<HTMLDivElement>,
    card: ImageInterface
  ) => {
    (e.target as HTMLDivElement).classList.add(styles.drag);
    setCurrentImage(card);
  };

  const dragEndHangler = (e: DragEvent<HTMLDivElement>) => {
    (e.target as HTMLDivElement).classList.remove(styles.lowOpacity);
  };

  const dragOverHangler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.target as HTMLDivElement).classList.add(styles.lowOpacity);
  };

  const dropHangler = (e: DragEvent<HTMLDivElement>, card: ImageInterface) => {
    const cardIndex = images.findIndex((item) => item.id === card.id);
    const currentIndex = images.findIndex(
      (item) => item.id === currentImage!.id
    );

    if (cardIndex !== currentIndex) {
      setImages((prev) => {
        [prev[cardIndex], prev[currentIndex]] = [
          prev[currentIndex],
          prev[cardIndex],
        ];
        dispatch(mixUserImages({ currentUser, images: prev }));
        return prev;
      });
    }
    (e.target as HTMLInputElement).classList.remove(styles.lowOpacity);
  };

  const emptyFieldsForLoop = [
    ...new Array(8 - currentUser.pictures.gallery.length),
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
              deleteImageHandler(
                imageObj.image,
                imageObj.setting as PicturesVariants
              )
            }
            onDragStart={(e) => dragStartHangler(e, imageObj)}
            onDragLeave={(e) => dragEndHangler(e)}
            onDragEnd={(e) => dragEndHangler(e)}
            onDragOver={(e) => dragOverHangler(e)}
            onDrop={(e) => dropHangler(e, imageObj)}
            src={makeImageUrl(
              currentUser._id,
              imageObj.image,
              imageObj.setting
            )}
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
