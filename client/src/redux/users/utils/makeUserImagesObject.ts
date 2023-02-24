import { ImageInterface, IUser } from '../../../models/IUser';

export function makeUserImagesObject(args: {
  currentUser: IUser;
  images: ImageInterface[];
}) {
  const { images } = args;
  const parsedImages = images.map((image) => image.image);

  return {
    pictures: { avatar: parsedImages[0], gallery: parsedImages.slice(1) },
  };
}
