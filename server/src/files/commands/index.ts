export { SavePictureCommand } from './save-picture';
export { DeletePictureCommand } from './delete-picture';

import { SavePictureCommandHandler } from './save-picture';
import { DeletePictureCommandHandler } from './delete-picture';

export const FileCommandHandlers = [
  SavePictureCommandHandler,
  DeletePictureCommandHandler,
];
