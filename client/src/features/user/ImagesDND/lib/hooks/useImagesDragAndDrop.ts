import type { DragEvent } from 'react';
import { useState, useEffect } from 'react';
import type { Picture } from '@shared/api/interfaces';
import { deleteUserImage, mixUserImages } from '@entities/user/model';
import { useAppDispatch, useAppSelector } from '@hooks';

export function useImagesDragAndDrop(styleName: string) {
  const dispatch = useAppDispatch();

  const userPictures = useAppSelector(
    (state) => state.user.currentUser.pictures
  );

  const [currentImage, setCurrentImage] = useState<Picture | null>(null);
  const [images, setImages] = useState<Picture[]>([]);

  useEffect(() => {
    setImages(userPictures);
  }, [userPictures]);

  const handleDeleteImage = (order: number): void => {
    dispatch(deleteUserImage(order));
  };

  const getDNDProps = (imageObj: Picture) => ({
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
      const cardIndex = images.findIndex(
        (item) => item.order === imageObj.order
      );
      const currentIndex = images.findIndex(
        (item) => item.order === currentImage!.order
      );

      if (cardIndex !== currentIndex) {
        setImages((prev) => {
          dispatch(
            mixUserImages({ order: cardIndex, withOrder: currentIndex })
          );
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
