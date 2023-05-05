import type {
  InnerObjectName,
  PartnerSettings,
  User,
} from '@shared/api/interfaces';

export interface Validation {
  min?: number;
  max?: number;
  email?: boolean;
}

export type SettingInputName = keyof User | keyof PartnerSettings | null;

type Setting = 'textarea' | 'select' | 'radio' | null;

export type ErrorField =
  | 'description'
  | 'sex'
  | 'interests'
  | 'place'
  | 'distance'
  | 'preferSex';

export interface SettingsInitialState {
  setting: Setting;
  settingInputName: SettingInputName;
  innerObjectName: InnerObjectName;
  isUserInfoSetting: boolean;
  validation: Validation | null;
  formName: string | null;
  errorFields: ErrorField[];
}

export interface SetInputPayload {
  inputName: SettingInputName;
  formName?: string | null;
  innerObjectName?: InnerObjectName;
  validation?: Validation | null;
}

export interface SettingFieldValues {
  input: string;
}

export interface SettingFieldArrayValues {
  input: string[];
}

export type ChangeablePartnerSettingsFields = 'place' | 'preferSex';

export type ChangeableUserFields =
  | 'email'
  | 'name'
  | 'description'
  | 'nickname'
  | 'sex'
  | 'interests';
