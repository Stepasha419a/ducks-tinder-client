import type { PicturesVariants } from '@shared/api/interfaces';
import { PicturesEnum } from '@shared/api/interfaces';
import defaultPhoto from '@shared/assets/images/default-duck.png';

export function makeImageUrl(
  userId?: string,
  avatarUrl?: string,
  dir: PicturesVariants = PicturesEnum.avatar,
): string {
  return avatarUrl && userId
    ? `http://localhost:5000/${userId}/${dir}/${avatarUrl}`
    : defaultPhoto;
}
