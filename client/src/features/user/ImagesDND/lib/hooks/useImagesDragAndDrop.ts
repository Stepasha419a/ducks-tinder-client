import type { DragEvent } from 'react';
import { useState, useEffect } from 'react';
import type { ImageInterface, PicturesVariants } from '@shared/api/interfaces';
import { useAppDispatch, useAppSelector } from '@hooks';
import { deleteUserImage, mixUserImages } from '@entities/user/model';
import { parseImages } from '../helpers';

export function useImagesDragAndDrop(styleName: string) {
  const dispatch = useAppDispatch();

  const userPictures = useAppSelector(
    (state) => state.user.currentUser.pictures
  );

  const [currentImage, setCurrentImage] = useState<ImageInterface | null>(null);
  const [images, setImages] = useState<ImageInterface[]>([]);

  useEffect(() => {
    setImages(parseImages(userPictures));
  }, [userPictures]);

  const handleDeleteImage = (
    pictureName: string,
    setting: PicturesVariants
  ): void => {
    dispatch(deleteUserImage({ pictureName, setting }));
  };

  const getDNDProps = (imageObj: ImageInterface) => ({
    onDragStart(): void {
      setCurrentImage(imageObj);
    },
    onDragLeave(e: DragEvent): void {
      (e.target as HTMLImageElement).classList.remove(styleName);
    },
    onDragEnd(e: DragEvent): void {
      (e.target as HTMLImageElement).classList.remove(styleName);
    },
    onDragOver(e: DragEvent): void {
      e.preventDefault();
      (e.target as HTMLImageElement).classList.add(styleName);
    },
    onDrop(e: DragEvent): void {
      const cardIndex = images.findIndex((item) => item.id === imageObj.id);
      const currentIndex = images.findIndex(
        (item) => item.id === currentImage!.id
      );

      if (cardIndex !== currentIndex) {
        setImages((prev) => {
          [prev[cardIndex], prev[currentIndex]] = [
            prev[currentIndex],
            prev[cardIndex],
          ];
          dispatch(mixUserImages(prev));
          return prev;
        });
      }
      (e.target as HTMLImageElement).classList.remove(styleName);
    },
  });

  return {
    images,
    handleDeleteImage,
    getDNDProps,
  };
}
