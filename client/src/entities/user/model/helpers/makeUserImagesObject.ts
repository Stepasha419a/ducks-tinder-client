import type { PicturesInterface } from '@shared/api/interfaces';
import type { ImageInterface } from '../user.interfaces';

export function makeUserImagesObject(images: ImageInterface[]): {
  pictures: PicturesInterface;
} {
  const imagesUrl = images.map((image) => image.image);

  return {
    pictures: { avatar: imagesUrl[0], gallery: imagesUrl.slice(1) },
  };
}
