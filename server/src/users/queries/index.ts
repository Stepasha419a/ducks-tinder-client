export { GetPairsQuery } from './get-pairs';
export { GetSortedQuery } from './get-sorted';
export { GetUserQuery } from './get-user';
export { GetUserByEmailQuery } from './get-user-by-email';

import { GetPairsQueryHandler } from './get-pairs';
import { GetSortedQueryHandler } from './get-sorted';
import { GetUserQueryHandler } from './get-user';
import { GetUserByEmailQueryHandler } from './get-user-by-email';

export const UserQueryHandlers = [
  GetPairsQueryHandler,
  GetSortedQueryHandler,
  GetUserQueryHandler,
  GetUserByEmailQueryHandler,
];
