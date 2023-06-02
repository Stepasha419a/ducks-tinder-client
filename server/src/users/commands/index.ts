export { PatchUserCommand } from './patch-user';
export { GetSortedCommand } from './get-sorted';

import { PatchUserHandler } from './patch-user';
import { GetSortedHandler } from './get-sorted';

export const UsersCommandHandlers = [PatchUserHandler, GetSortedHandler];
