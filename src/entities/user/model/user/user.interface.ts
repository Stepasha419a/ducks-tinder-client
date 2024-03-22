import type { User } from '@shared/api/interfaces';
import type { SettingNameEnum } from '../../lib';

export interface UserInitialState {
  currentUser: User | null;
  errorFields: Setting[];
}

export type Setting =
  | SettingNameEnum
  | 'place'
  | 'age'
  | 'distance'
  | 'preferAgeFrom'
  | 'preferAgeTo'
  | 'usersOnlyInDistance';

export type ProfileSettingSelectName =
  | 'interests'
  | 'zodiacSign'
  | 'education'
  | 'childrenAttitude'
  | 'personalityType'
  | 'communicationStyle'
  | 'attentionSign'
  | 'alcoholAttitude'
  | 'chronotype'
  | 'foodPreference'
  | 'pet'
  | 'smokingAttitude'
  | 'socialNetworksActivity'
  | 'trainingAttitude';

export interface SettingFieldValues {
  input: string;
}

export interface SettingFieldInterestsArray {
  input: string[];
}

export type ProfileSelectInput = Record<
  ProfileSettingSelectName,
  string[] | string | null
>;

export interface MultiSelectForm {
  input: ProfileSelectInput;
}

export interface SelectValidation {
  maxLength: number;
}
