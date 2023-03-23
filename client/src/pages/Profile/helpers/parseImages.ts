import {
  ImageInterface,
  PicturesEnum,
  PicturesInterface,
} from '../../../models/User/User';

export function parseImages(pictures: PicturesInterface): ImageInterface[] {
  return Object.values(pictures).reduce(
    (acc, cur, i) =>
      Array.isArray(cur)
        ? [
            ...acc,
            ...cur.map((image, i) => {
              return { id: i + 1, image, setting: PicturesEnum.gallery };
            }),
          ]
        : [...acc, { id: i, image: cur, setting: PicturesEnum.avatar }],
    []
  );
}
