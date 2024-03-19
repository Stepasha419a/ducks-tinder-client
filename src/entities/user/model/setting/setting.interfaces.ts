export interface Validation {
  min?: number;
  max?: number;
  email?: boolean;
}

export interface SettingProperties {
  formName?: string;
  validation?: Validation;
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

export interface SettingInitialState {
  settingName: SettingNameEnum | null;
  errorFields: Setting[];
}

export interface SetInputPayload {
  settingName: SettingNameEnum;
  formName?: string | null;
  validation?: Validation | null;
}

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
