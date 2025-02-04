import { WithErrorFallback } from '@ducks-tinder-client/common';
import { Nav as NavRaw } from './Nav';

export const Nav = WithErrorFallback(NavRaw);
