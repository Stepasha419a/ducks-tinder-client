import { useEffect, useState } from 'react';

import type { Picture } from '@ducks-tinder-client/common';
import { useAppSelector } from '@ducks-tinder-client/common';

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
