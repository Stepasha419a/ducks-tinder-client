import defaultPhoto from '../../assets/images/default-duck.png';
import { PicturesEnum, PicturesVariants } from '../api/interfaces';

export function makeImageUrl(
  userId?: string,
  avatarUrl?: string,
  dir: PicturesVariants = PicturesEnum.avatar
): string {
  return avatarUrl && userId
    ? `http://localhost:5000/${userId}/${dir}/${avatarUrl}`
    : defaultPhoto;
}
