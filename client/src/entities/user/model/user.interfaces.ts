import type { Interest, Range, ShortUser, User } from '@shared/api/interfaces';

export interface PairSorts {
  distance: number;
  age: Range;
  photos: number;
  interests: Interest[];
  account: string[];
}

export type PairSortsKey = keyof PairSorts;

export interface UserInitialState {
  currentUser: User;
  currentPair: ShortUser | null;
  pairs: ShortUser[];
  pairSorts: PairSorts;
  profileSetting: {
    imageURL: string | null;
    isImageCropOpen: boolean;
    isDialogUploadOpen: boolean;
  };
}
