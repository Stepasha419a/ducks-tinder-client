export interface Validation {
  min?: number;
  max?: number;
  email?: boolean;
}

export interface SettingProperties {
  formName?: string;
  validation?: Validation;
}

export type SettingName =
  | 'email'
  | 'name'
  | 'description'
  | 'sex'
  | 'place'
  | 'preferSex'
  | 'nickname';

type SettingType = 'textarea' | 'radio' | 'text' | null;

export type Setting =
  | SettingName
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
  settingType: SettingType;
  settingName: SettingName | null;
  validation: Validation | null;
  formName: string | null;
  errorFields: Setting[];
}

export interface SetInputPayload {
  settingName: SettingName;
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
