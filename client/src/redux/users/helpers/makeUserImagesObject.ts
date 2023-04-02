import { ImageInterface } from '../../../shared/api/interfaces';

export function makeUserImagesObject(images: ImageInterface[]) {
  const imagesUrl = images.map((image) => image.image);

  return {
    pictures: { avatar: imagesUrl[0], gallery: imagesUrl.slice(1) },
  };
}
