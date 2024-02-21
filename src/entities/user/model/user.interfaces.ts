import type { Range, ShortUser, User } from '@shared/api/interfaces';

export interface PairSorts {
  distance: number;
  age: Range;
  photos: number;
  interests: string[];
  account: string[];
}

export type PairSortsKey = keyof PairSorts;

export interface UserInitialState {
  currentUser: User;
  currentPair: ShortUser | null;
  isPairsLoading: boolean;
  pairs: ShortUser[];
  pairSorts: PairSorts;
  profileSetting: {
    imageURL: string | null;
    isImageCropOpen: boolean;
    isDialogUploadOpen: boolean;
  };
}
