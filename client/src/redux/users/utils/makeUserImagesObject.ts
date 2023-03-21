import { ImageInterface } from '../../../models/User/User';

export function makeUserImagesObject(images: ImageInterface[]) {
  const imagesUrl = images.map((image) => image.image);

  return {
    pictures: { avatar: imagesUrl[0], gallery: imagesUrl.slice(1) },
  };
}
