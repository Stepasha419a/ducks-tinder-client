import type { Picture } from '@ducks-tinder-client/common';

import { checkChangedPictures } from '../helpers';
import { useAppDispatch } from '@shared/lib';
import { mixUserPicturesThunk } from '@entities/user';

export function usePicturesMix() {
  const dispatch = useAppDispatch();

  const handleMixPictures = (pictures: Picture[]) => {
    const isChanged = checkChangedPictures(pictures);
    if (isChanged) {
      dispatch(mixUserPicturesThunk(pictures));
    }
  };

  return handleMixPictures;
}
