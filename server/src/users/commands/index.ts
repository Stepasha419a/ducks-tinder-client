export { PatchUserCommand } from './patch-user';
export { GetSortedCommand } from './get-sorted';
export { SavePictureCommand } from './save-picture';
export { DeletePictureCommand } from './delete-picture';

import { PatchUserHandler } from './patch-user';
import { GetSortedHandler } from './get-sorted';
import { SavePictureHandler } from './save-picture';
import { DeletePictureHandler } from './delete-picture';

export const UsersCommandHandlers = [
  PatchUserHandler,
  GetSortedHandler,
  SavePictureHandler,
  DeletePictureHandler,
];
