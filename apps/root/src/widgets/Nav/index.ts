import { WithErrorFallback } from '@shared/lib';
import { Nav as NavRaw } from './Nav';

export const Nav = WithErrorFallback(NavRaw);
