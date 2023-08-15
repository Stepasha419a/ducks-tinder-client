import type { Picture } from '@/shared/api/interfaces';
import { checkChangedPictures } from '../helpers';
import { useAppDispatch } from '@/shared/lib/hooks';
import { mixUserPicturesThunk } from '@/entities/user/model';

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
