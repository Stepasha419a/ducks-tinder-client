export { PatchUserCommand } from './patch-user';
export { GetSortedCommand } from './get-sorted';
export { SavePictureCommand } from './save-picture';
export { DeletePictureCommand } from './delete-picture';
export { MixPicturesCommand } from './mix-pictures';
export { LikeUserCommand } from './like-user';
export { DislikeUserCommand } from './dislike-user';
export { ReturnUserCommand } from './return-user';

import { PatchUserHandler } from './patch-user';
import { GetSortedHandler } from './get-sorted';
import { SavePictureHandler } from './save-picture';
import { DeletePictureHandler } from './delete-picture';
import { MixPicturesHandler } from './mix-pictures';
import { LikeUserHandler } from './like-user';
import { DislikeUserHandler } from './dislike-user';
import { ReturnUserHandler } from './return-user';

export const UsersCommandHandlers = [
  PatchUserHandler,
  GetSortedHandler,
  SavePictureHandler,
  DeletePictureHandler,
  MixPicturesHandler,
  LikeUserHandler,
  DislikeUserHandler,
  ReturnUserHandler,
];
