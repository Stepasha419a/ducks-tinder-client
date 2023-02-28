import { User, PartnerSettings } from '../../models/User';

export interface Validation {
  min?: number;
  max?: number;
  email?: boolean;
}

export type RangeType = { from: number; to: number };

export type ChangedData = String | Number | Boolean | String[] | RangeType;

export type InnerObjectName = 'partnerSettings' | null;
export type SettingInputName = keyof User | keyof PartnerSettings | null;
export type ErrorField =
  | 'description'
  | 'sex'
  | 'interests'
  | 'place'
  | 'distance'
  | 'preferSex';

export type ChangableUserFields =
  | 'email'
  | 'name'
  | 'description'
  | 'nickname'
  | 'sex'
  | 'interests';

export type ChangablePartnerSettingsFields = 'place' | 'preferSex';

export type KindOfSetting = 'textarea' | 'select' | 'radio' | null;
