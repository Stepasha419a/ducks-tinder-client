export { PatchUserCommand } from './patch-user';
export { SavePictureCommand } from './save-picture';
export { DeletePictureCommand } from './delete-picture';
export { MixPicturesCommand } from './mix-pictures';
export { LikeUserCommand } from './like-user';
export { DislikeUserCommand } from './dislike-user';
export { ReturnUserCommand } from './return-user';
export { DeletePairCommand } from './delete-pair';
export { CreateUserCommand } from './create-user';
export { AcceptPairCommand } from './accept-pair';
export { RemoveAllPairsCommand } from './remove-all-pairs';

import { PatchUserCommandHandler } from './patch-user';
import { SavePictureCommandHandler } from './save-picture';
import { DeletePictureCommandHandler } from './delete-picture';
import { MixPicturesCommandHandler } from './mix-pictures';
import { LikeUserCommandHandler } from './like-user';
import { DislikeUserCommandHandler } from './dislike-user';
import { ReturnUserCommandHandler } from './return-user';
import { DeletePairCommandHandler } from './delete-pair';
import { CreateUserCommandHandler } from './create-user';
import { AcceptPairCommandHandler } from './accept-pair';
import { RemoveAllPairsCommandHandler } from './remove-all-pairs';

export const UserCommandHandlers = [
  PatchUserCommandHandler,
  SavePictureCommandHandler,
  DeletePictureCommandHandler,
  MixPicturesCommandHandler,
  LikeUserCommandHandler,
  DislikeUserCommandHandler,
  ReturnUserCommandHandler,
  DeletePairCommandHandler,
  CreateUserCommandHandler,
  AcceptPairCommandHandler,
  RemoveAllPairsCommandHandler,
];
