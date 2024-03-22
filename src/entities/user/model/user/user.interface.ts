import type { User } from '@shared/api/interfaces';
import type { SettingNameEnum } from '../../lib';
import type { ProfileSettingSelectNameEnum } from '../../lib/constants';

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

export type ProfileSelectInput = Record<
  ProfileSettingSelectNameEnum,
  string[] | string | null
>;

export interface MultiSelectForm {
  input: ProfileSelectInput;
}

export interface SelectValidation {
  maxLength: number;
}
