import type {
  ImageInterface,
  PicturesInterface,
} from '../../../shared/api/interfaces';
import { PicturesEnum } from '../../../shared/api/interfaces';

export function parseImages(pictures: PicturesInterface): ImageInterface[] {
  return Object.values(pictures).reduce(
    (acc, cur, i) =>
      Array.isArray(cur)
        ? [
          ...acc,
          ...cur.map((image, index) => {
            return { id: index + 1, image, setting: PicturesEnum.gallery };
          }),
        ]
        : [...acc, { id: i, image: cur, setting: PicturesEnum.avatar }],
    []
  );
}
