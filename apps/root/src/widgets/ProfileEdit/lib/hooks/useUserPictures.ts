import type { Picture } from '@ducks-tinder-client/common';
import { useState, useEffect } from 'react';
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
