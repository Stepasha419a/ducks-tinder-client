export { PatchUserCommand } from './patch-user';
export { GetSortedCommand } from './get-sorted';
export { SavePictureCommand } from './save-picture';
export { DeletePictureCommand } from './delete-picture';
export { MixPicturesCommand } from './mix-pictures';

import { PatchUserHandler } from './patch-user';
import { GetSortedHandler } from './get-sorted';
import { SavePictureHandler } from './save-picture';
import { DeletePictureHandler } from './delete-picture';
import { MixPicturesHandler } from './mix-pictures';

export const UsersCommandHandlers = [
  PatchUserHandler,
  GetSortedHandler,
  SavePictureHandler,
  DeletePictureHandler,
  MixPicturesHandler,
];
