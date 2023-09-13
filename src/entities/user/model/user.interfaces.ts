import type {
  NameObject,
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
  interests: NameObject[];
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

  interests: NameObject[];
  attentionSign: NameObject | null;
  childrenAttitude: NameObject | null;
  communicationStyle: NameObject | null;
  education: NameObject | null;
  personalityType: NameObject | null;
  zodiacSign: NameObject | null;

  alcoholAttitude: NameObject | null;
  chronotype: NameObject | null;
  foodPreference: NameObject | null;
  pet: NameObject | null;
  smokingAttitude: NameObject | null;
  socialNetworksActivity: NameObject | null;
  trainingAttitude: NameObject | null;

  pictures: Picture[];
}
