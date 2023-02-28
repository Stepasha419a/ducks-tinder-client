import { ImageInterface, User } from '../../../models/User';

export function makeUserImagesObject(args: {
  currentUser: User;
  images: ImageInterface[];
}) {
  const { images } = args;
  const parsedImages = images.map((image) => image.image);

  return {
    pictures: { avatar: parsedImages[0], gallery: parsedImages.slice(1) },
  };
}
