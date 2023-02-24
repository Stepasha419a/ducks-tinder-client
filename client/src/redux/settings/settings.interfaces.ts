import { IUser, PartnerSettings } from '../../models/IUser';

export interface Validation {
  min?: number;
  max?: number;
  email?: boolean;
}

export type RangeType = { from: number; to: number };

export type ChangedData = String | Number | Boolean | String[] | RangeType;

export type InnerObjectName = 'partnerSettings' | null;
export type SettingInputName = keyof IUser | keyof PartnerSettings | null;
export type ErrorField =
  | 'description'
  | 'sex'
  | 'interests'
  | 'place'
  | 'distance'
  | 'preferSex';
