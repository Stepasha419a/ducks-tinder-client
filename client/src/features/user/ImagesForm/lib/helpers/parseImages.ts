import type { ImageInterface, PicturesInterface } from '@shared/api/interfaces';
import { PicturesEnum } from '@shared/api/interfaces';

export function parseImages(pictures: PicturesInterface): ImageInterface[] {
  return Object.values(pictures).reduce<ImageInterface[]>(
    (acc: ImageInterface[], current: string | string[], i) =>
      Array.isArray(current)
        ? [
            ...acc,
            ...current.map((image: string, index) => {
              return { id: index + 1, image, setting: PicturesEnum.gallery };
            }),
          ]
        : [...acc, { id: i, image: current, setting: PicturesEnum.avatar }],
    []
  );
}
