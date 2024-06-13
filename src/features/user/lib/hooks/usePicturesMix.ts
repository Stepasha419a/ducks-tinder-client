import { mixUserPicturesThunk } from '@entities/user';
import type { Picture } from '@shared/api/interfaces';
import { useAppDispatch } from '@shared/lib/hooks';
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
