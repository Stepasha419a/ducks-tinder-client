import { useState, useEffect } from 'react';
import type { Picture } from '@shared/api/interfaces';
import {
  deleteUserPictureThunk,
  mixUserPicturesThunk,
} from '@entities/user/model';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';

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
    dispatch(deleteUserPictureThunk(order));
  };

  const handleMixPictures = () => {
    let isChanged = false;
    for (let i = 0; i < pictures.length; i++) {
      if (pictures[i].order !== i) {
        isChanged = true;
        break;
      }
    }
    if (isChanged) {
      dispatch(mixUserPicturesThunk(pictures));
    }
  };

  return {
    pictures,
    setPictures,
    handleDeletePicture,
    handleMixPictures,
  };
}
