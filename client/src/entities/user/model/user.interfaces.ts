import type {
  Interest,
  Picture,
  Place,
  Range,
  ShortUser,
  User,
} from '@shared/api/interfaces';

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
  isPairsLoading: boolean;
  pairs: ShortUser[];
  pairSorts: PairSorts;
  profileSetting: {
    imageURL: string | null;
    isImageCropOpen: boolean;
    isDialogUploadOpen: boolean;
  };
}

export interface PreviewUser {
  id: string;
  name: string;
  description: string | null;
  age: number | null;
  place: Place | null;
  distance: number | null;
  interests: Interest[];
  pictures: Picture[];
}
