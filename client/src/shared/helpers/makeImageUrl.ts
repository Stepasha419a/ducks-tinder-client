import defaultPhoto from '@images/default-duck.png';
import type { PicturesVariants } from '@shared/api/interfaces';
import { PicturesEnum } from '@shared/api/interfaces';

export function makeImageUrl(
  userId?: string,
  avatarUrl?: string,
  dir: PicturesVariants = PicturesEnum.avatar,
): string {
  return avatarUrl && userId
    ? `http://localhost:5000/${userId}/${dir}/${avatarUrl}`
    : defaultPhoto;
}
