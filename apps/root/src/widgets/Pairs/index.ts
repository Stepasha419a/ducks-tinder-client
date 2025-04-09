import { WithErrorFallback } from '@ducks-tinder-client/common';

import { Pairs as PairsRaw } from './ui/Pairs';

export const Pairs = WithErrorFallback(PairsRaw);
