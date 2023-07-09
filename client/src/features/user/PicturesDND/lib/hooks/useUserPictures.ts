import { useState, useEffect } from 'react';
import type { Picture } from '@shared/api/interfaces';
import { deleteUserImage } from '@entities/user/model';
import { useAppDispatch, useAppSelector } from '@hooks';

export function useUserPictures() {
  const dispatch = useAppDispatch();

  const userPictures = useAppSelector(
    (state) => state.user.currentUser.pictures
  );

  const [pictures, setPictures] = useState<Picture[]>([]);

  useEffect(() => {
    setPictures(userPictures);
  }, [userPictures]);

  const handleDeletePicture = (order: number): void => {
    dispatch(deleteUserImage(order));
  };

  return {
    pictures,
    setPictures,
    handleDeletePicture,
  };
}
