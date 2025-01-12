import { WithErrorFallback } from '@shared/lib';
import { Pairs as PairsRaw } from './ui/Pairs';

export const Pairs = WithErrorFallback(PairsRaw);
