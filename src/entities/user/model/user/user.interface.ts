import type { User } from '@shared/api/interfaces';

export interface UserInitialState {
  currentUser: User | null;
  errorFields: Setting[];
}

export interface Validation {
  min?: number;
  max?: number;
  email?: boolean;
}

export enum SettingNameEnum {
  EMAIL = 'email',
  NAME = 'name',
  DESCRIPTION = 'description',
  SEX = 'sex',
  PREFER_SEX = 'preferSex',
  NICKNAME = 'nickname',
}

export enum SettingTypeEnum {
  TEXTAREA = 'textarea',
  RADIO = 'radio',
  TEXT = 'text',
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

export interface SettingProperties {
  formName?: string;
  validation?: Validation;
}

export interface MultiSelectForm {
  input: ProfileSelectInput;
}

export interface SelectValidation {
  maxLength: number;
}
