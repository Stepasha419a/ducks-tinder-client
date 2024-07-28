import { useState, useEffect } from 'react';
import type { Picture } from '@shared/api';
import { useAppSelector } from '@shared/lib';

export function useUserPictures() {
  const userPictures = useAppSelector(
    (state) => state.user.currentUser!.pictures
  );

  const [pictures, setPictures] = useState<Picture[]>([]);

  useEffect(() => {
    setPictures(userPictures);
  }, [userPictures]);

  return {
    pictures,
    setPictures,
  };
}
