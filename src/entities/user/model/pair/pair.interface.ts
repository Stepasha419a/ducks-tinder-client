import type { Range, ShortUser } from '@/shared/api/interfaces';
import type { PairsInfo } from '@/shared/api/services/user/user-service.interface';

export interface PairSorts {
  distance: number;
  age: Range;
  photos: number;
  interests: string[];
  account: string[];
}

export type PairSortsKey = keyof PairSorts;

export interface PairInitialState {
  currentPair: ShortUser | null;
  isPairsLoading: boolean;
  pairs: ShortUser[];
  pairSorts: PairSorts;
  isPairsInfoLoading: boolean;
  pairsInfo: PairsInfo;
}
