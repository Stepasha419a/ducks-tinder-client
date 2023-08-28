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
export { RemoveAllPairsCommand } from './remove-all-pairs-dev';
export { CreatePairsCommand } from './create-pairs-dev';
export { PatchUserPlaceCommand } from './patch-user-place';
export { PatchUserRelationsCommand } from './patch-user-relations';

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
import { RemoveAllPairsCommandHandler } from './remove-all-pairs-dev';
import { CreatePairsCommandHandler } from './create-pairs-dev';
import { PatchUserPlaceCommandHandler } from './patch-user-place';
import { PatchUserRelationsHandlerCommand } from './patch-user-relations';

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
  CreatePairsCommandHandler,
  PatchUserPlaceCommandHandler,
  PatchUserRelationsHandlerCommand,
];
