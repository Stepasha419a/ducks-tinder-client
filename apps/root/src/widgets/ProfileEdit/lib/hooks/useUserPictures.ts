import { useEffect, useState } from 'react';

import type { Picture } from '@ducks-tinder-client/common';
import { useUserStore } from '@ducks-tinder-client/auth';

export function useUserPictures() {
  const userPictures = useUserStore((state) => state.currentUser?.pictures);

  const [pictures, setPictures] = useState<Picture[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPictures(userPictures || []);
  }, [userPictures]);

  return {
    pictures,
    setPictures,
  };
}
