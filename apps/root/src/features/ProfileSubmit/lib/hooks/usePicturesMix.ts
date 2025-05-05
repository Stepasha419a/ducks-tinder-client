import type { Picture } from '@ducks-tinder-client/common';
import {
  mixUserPicturesThunk,
  useAppDispatch,
} from '@ducks-tinder-client/common';

import { checkChangedPictures } from '../helpers';

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
