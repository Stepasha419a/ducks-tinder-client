import type { Range, ShortUser } from '@/shared/api/interfaces';
import type { PairsInfo } from '@/shared/api/services/user/user-service.interface';

export interface PairFilterForm {
  distance: number;
  age: Range;
  photos: number;
  interests: string[];
  account: string[];
}

export type PairFilterKey = keyof PairFilterForm;

export interface PairInitialState {
  pairs: ShortUser[];
  isPairsLoading: boolean;
  isPairsEnded: boolean;
  isPairsInfoLoading: boolean;
  pairsInfo: PairsInfo;
}
