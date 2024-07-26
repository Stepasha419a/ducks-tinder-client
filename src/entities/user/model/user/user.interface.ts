import type { User } from '@shared/api';
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
